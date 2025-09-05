using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using back.Services;
using System.Diagnostics;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly MongoDbService _mongoDbService;

        public SearchController(ApplicationDbContext context, MongoDbService mongoDbService)
        {
            _context = context;
            _mongoDbService = mongoDbService;
        }

        [HttpGet("books")]
        public async Task<IActionResult> SearchBooks(
            [FromQuery] string? searchTerm = null,
            [FromQuery] string? category = null,
            [FromQuery] string? author = null,
            [FromQuery] int? minRating = null,
            [FromQuery] int? maxRating = null,
            [FromQuery] int? minPrice = null,
            [FromQuery] int? maxPrice = null,
            [FromQuery] int? minYear = null,
            [FromQuery] int? maxYear = null,
            [FromQuery] string sortBy = "title",
            [FromQuery] string sortOrder = "asc",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var stopwatch = Stopwatch.StartNew();
            var query = _context.Books.AsQueryable();

            // Apply search term filter (full-text search)
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(b => 
                    b.Title.Contains(searchTerm) || 
                    b.Author.Contains(searchTerm) || 
                    b.Description.Contains(searchTerm) ||
                    b.Category.Contains(searchTerm));
            }

            // Apply category filter
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category.ToLower() == category.ToLower());
            }

            // Apply author filter
            if (!string.IsNullOrEmpty(author))
            {
                query = query.Where(b => b.Author.Contains(author));
            }

            // Apply rating filters
            if (minRating.HasValue)
            {
                query = query.Where(b => b.Rating >= minRating.Value);
            }
            if (maxRating.HasValue)
            {
                query = query.Where(b => b.Rating <= maxRating.Value);
            }

            // Apply price filters
            if (minPrice.HasValue)
            {
                query = query.Where(b => b.Price >= minPrice.Value);
            }
            if (maxPrice.HasValue)
            {
                query = query.Where(b => b.Price <= maxPrice.Value);
            }

            // Apply year filters
            if (minYear.HasValue)
            {
                query = query.Where(b => b.Year.Year >= minYear.Value);
            }
            if (maxYear.HasValue)
            {
                query = query.Where(b => b.Year.Year <= maxYear.Value);
            }

            // Apply sorting
            query = sortBy.ToLower() switch
            {
                "title" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title),
                "author" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Author) : query.OrderBy(b => b.Author),
                "rating" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Rating) : query.OrderBy(b => b.Rating),
                "price" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Price) : query.OrderBy(b => b.Price),
                "year" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Year) : query.OrderBy(b => b.Year),
                "category" => sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Category) : query.OrderBy(b => b.Category),
                _ => query.OrderBy(b => b.Title)
            };

            // Get total count for pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var books = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            stopwatch.Stop();

            // Track search in MongoDB
            try
            {
                var filters = new Dictionary<string, object>();
                if (!string.IsNullOrEmpty(category)) filters["category"] = category;
                if (!string.IsNullOrEmpty(author)) filters["author"] = author;
                if (minRating.HasValue) filters["minRating"] = minRating.Value;
                if (maxRating.HasValue) filters["maxRating"] = maxRating.Value;
                if (minPrice.HasValue) filters["minPrice"] = minPrice.Value;
                if (maxPrice.HasValue) filters["maxPrice"] = maxPrice.Value;
                if (minYear.HasValue) filters["minYear"] = minYear.Value;
                if (maxYear.HasValue) filters["maxYear"] = maxYear.Value;

                var searchLog = new SearchLog
                {
                    SearchTerm = searchTerm ?? "",
                    Filters = filters,
                    ResultCount = totalCount,
                    ExecutionTimeMs = stopwatch.ElapsedMilliseconds
                };

                await _mongoDbService.SearchLogs.InsertOneAsync(searchLog);
            }
            catch (Exception ex)
            {
                // Log error but don't fail the search
                Console.WriteLine($"Error logging search: {ex.Message}");
            }

            var result = new
            {
                Books = books,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
                ExecutionTimeMs = stopwatch.ElapsedMilliseconds
            };

            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("authors")]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _context.Books
                .Select(b => b.Author)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();

            return Ok(authors);
        }

        [HttpGet("search-suggestions")]
        public async Task<IActionResult> GetSearchSuggestions([FromQuery] string term)
        {
            if (string.IsNullOrEmpty(term) || term.Length < 2)
            {
                return Ok(new List<string>());
            }

            var suggestions = await _context.Books
                .Where(b => b.Title.Contains(term) || b.Author.Contains(term))
                .Select(b => new { b.Title, b.Author })
                .Take(10)
                .ToListAsync();

            var result = suggestions
                .SelectMany(s => new[] { s.Title, s.Author })
                .Where(s => s.Contains(term))
                .Distinct()
                .Take(10)
                .ToList();

            return Ok(result);
        }
    }
}
