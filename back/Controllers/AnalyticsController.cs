using Microsoft.AspNetCore.Mvc;
using back.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using MongoDB.Driver;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AnalyticsController(MongoDbService mongoDbService, IHttpContextAccessor httpContextAccessor)
        {
            _mongoDbService = mongoDbService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("track-book-view")]
        public async Task<IActionResult> TrackBookView([FromBody] TrackBookViewRequest request)
        {
            try
            {
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userEmail = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;

                // Log user activity
                var userActivity = new UserActivity
                {
                    UserId = userId ?? "anonymous",
                    UserEmail = userEmail ?? "anonymous",
                    ActivityType = "view",
                    BookId = request.BookId,
                    BookTitle = request.BookTitle,
                    IpAddress = GetClientIpAddress(),
                    UserAgent = Request.Headers["User-Agent"].ToString()
                };

                await _mongoDbService.UserActivities.InsertOneAsync(userActivity);

                // Update book analytics
                var filter = Builders<BookAnalytics>.Filter.Eq(x => x.BookId, request.BookId);
                var update = Builders<BookAnalytics>.Update
                    .Inc(x => x.ViewCount, 1)
                    .Set(x => x.LastViewed, DateTime.UtcNow);

                await _mongoDbService.BookAnalytics.UpdateOneAsync(filter, update, new MongoDB.Driver.UpdateOptions { IsUpsert = true });

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
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userEmail = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;

                // Log search activity
                var userActivity = new UserActivity
                {
                    UserId = userId ?? "anonymous",
                    UserEmail = userEmail ?? "anonymous",
                    ActivityType = "search",
                    SearchTerm = request.SearchTerm,
                    IpAddress = GetClientIpAddress(),
                    UserAgent = Request.Headers["User-Agent"].ToString()
                };

                await _mongoDbService.UserActivities.InsertOneAsync(userActivity);

                // Log search details
                var searchLog = new SearchLog
                {
                    SearchTerm = request.SearchTerm,
                    Filters = request.Filters ?? new Dictionary<string, object>(),
                    ResultCount = request.ResultCount,
                    UserId = userId,
                    ExecutionTimeMs = request.ExecutionTimeMs
                };

                await _mongoDbService.SearchLogs.InsertOneAsync(searchLog);

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
                var popularBooks = await _mongoDbService.BookAnalytics
                    .Find(_ => true)
                    .Sort(Builders<BookAnalytics>.Sort.Descending(x => x.ViewCount))
                    .Limit(limit)
                    .ToListAsync();

                return Ok(popularBooks);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting popular books: {ex.Message}");
            }
        }

        [HttpGet("search-statistics")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetSearchStatistics([FromQuery] int days = 30)
        {
            try
            {
                var startDate = DateTime.UtcNow.AddDays(-days);
                
                var searchStats = await _mongoDbService.SearchLogs
                    .Find(x => x.Timestamp >= startDate)
                    .ToListAsync();

                var totalSearches = searchStats.Count;
                var uniqueUsers = searchStats.Select(x => x.UserId).Distinct().Count();
                var averageExecutionTime = searchStats.Average(x => x.ExecutionTimeMs);
                var topSearchTerms = searchStats
                    .GroupBy(x => x.SearchTerm)
                    .OrderByDescending(g => g.Count())
                    .Take(10)
                    .Select(g => new { Term = g.Key, Count = g.Count() })
                    .ToList();

                var result = new
                {
                    TotalSearches = totalSearches,
                    UniqueUsers = uniqueUsers,
                    AverageExecutionTimeMs = Math.Round(averageExecutionTime, 2),
                    TopSearchTerms = topSearchTerms,
                    PeriodDays = days
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting search statistics: {ex.Message}");
            }
        }

        [HttpGet("user-activity")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserActivity([FromQuery] int days = 7)
        {
            try
            {
                var startDate = DateTime.UtcNow.AddDays(-days);
                
                var activities = await _mongoDbService.UserActivities
                    .Find(x => x.Timestamp >= startDate)
                    .Sort(Builders<UserActivity>.Sort.Descending(x => x.Timestamp))
                    .Limit(100)
                    .ToListAsync();

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
