using Microsoft.AspNetCore.Mvc;
using back.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly RedisService _redisService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AnalyticsController(
            RedisService redisService,
            IHttpContextAccessor httpContextAccessor)
        {
            _redisService = redisService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("track-book-view")]
        public async Task<IActionResult> TrackBookView([FromBody] TrackBookViewRequest request)
        {
            try
            {
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "anonymous";

                // ✅ Save to Redis
                await _redisService.TrackBookViewAsync(request.BookId, request.BookTitle);
                await _redisService.TrackUserActivityAsync(userId, "view", new { request.BookId, request.BookTitle });

                return Ok(new { Success = true });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error tracking book view: {ex.Message}");
            }
        }

        [HttpPost("track-search")]
        public async Task<IActionResult> TrackSearch([FromBody] TrackSearchRequest request)
        {
            try
            {
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "anonymous";

                // ✅ Save to Redis
                await _redisService.TrackSearchQueryAsync(request.SearchTerm, request.ResultCount, request.ExecutionTimeMs);
                await _redisService.TrackUserActivityAsync(userId, "search", new { request.SearchTerm, request.ResultCount });

                return Ok(new { Success = true });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error tracking search: {ex.Message}");
            }
        }

        [HttpGet("popular-books")]
        public async Task<IActionResult> GetPopularBooks([FromQuery] int limit = 10)
        {
            try
            {
                var popularBooks = await _redisService.GetPopularBooksAsync(limit);
                return Ok(popularBooks);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting popular books: {ex.Message}");
            }
        }

        [HttpGet("search-statistics")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetSearchStatistics()
        {
            try
            {
                var stats = await _redisService.GetSearchStatsAsync();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting search statistics: {ex.Message}");
            }
        }

        [HttpGet("user-activity")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserActivity([FromQuery] string userId)
        {
            try
            {
                // This is a placeholder — you could extend RedisService to pull back
                // recent activities by scanning "user_activity:{userId}:*" keys.
                var keys = await _redisService.GetKeysAsync($"user_activity:{userId}:*");

                var activities = new List<object>();
                foreach (var key in keys.OrderByDescending(k => k))
                {
                    var activity = await _redisService.GetAsync<object>(key);
                    if (activity != null)
                        activities.Add(activity);
                }

                return Ok(activities);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting user activity: {ex.Message}");
            }
        }

        private string GetClientIpAddress()
        {
            var ipAddress = _httpContextAccessor.HttpContext?.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            }
            return ipAddress ?? "unknown";
        }
    }

    public class TrackBookViewRequest
    {
        public int BookId { get; set; }
        public string BookTitle { get; set; } = string.Empty;
    }

    public class TrackSearchRequest
    {
        public string SearchTerm { get; set; } = string.Empty;
        public Dictionary<string, object> Filters { get; set; } = new();
        public int ResultCount { get; set; }
        public long ExecutionTimeMs { get; set; }
    }
}
