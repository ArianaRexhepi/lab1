using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using CsvHelper;
using System.Text;
using System.Text.Json;
using StackExchange.Redis;


namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ExportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IDatabase _redis;

        public ExportController(ApplicationDbContext context)
        {
            _context = context;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
           var redisConnection = ConnectionMultiplexer.Connect("localhost:6379");
            _redis = redisConnection.GetDatabase();
        }

        [HttpGet("books/csv")]
        public async Task<IActionResult> ExportBooksToCsv()
        {
            var books = await _context.Books.ToListAsync();

            using var memoryStream = new MemoryStream();
            using var writer = new StreamWriter(memoryStream, Encoding.UTF8);
            using var csv = new CsvWriter(writer, System.Globalization.CultureInfo.InvariantCulture);

            csv.WriteRecords(books);
            await writer.FlushAsync();

            var bytes = memoryStream.ToArray();
            return File(bytes, "text/csv", $"books_export_{DateTime.Now:yyyyMMdd_HHmmss}.csv");
        }

        [HttpGet("books/excel")]
        public async Task<IActionResult> ExportBooksToExcel()
        {
            var books = await _context.Books.ToListAsync();

            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Books");

            // Add headers
            worksheet.Cells[1, 1].Value = "Id";
            worksheet.Cells[1, 2].Value = "Title";
            worksheet.Cells[1, 3].Value = "Author";
            worksheet.Cells[1, 4].Value = "Description";
            worksheet.Cells[1, 5].Value = "Category";
            worksheet.Cells[1, 6].Value = "Rating";
            worksheet.Cells[1, 7].Value = "Year";
            worksheet.Cells[1, 8].Value = "Price";
            worksheet.Cells[1, 9].Value = "Image";

            // Add data
            for (int i = 0; i < books.Count; i++)
            {
                var book = books[i];
                worksheet.Cells[i + 2, 1].Value = book.Id;
                worksheet.Cells[i + 2, 2].Value = book.Title;
                worksheet.Cells[i + 2, 3].Value = book.Author;
                worksheet.Cells[i + 2, 4].Value = book.Description;
                worksheet.Cells[i + 2, 5].Value = book.Category;
                worksheet.Cells[i + 2, 6].Value = book.Rating;
                worksheet.Cells[i + 2, 7].Value = book.Year.ToString("yyyy-MM-dd");
                worksheet.Cells[i + 2, 8].Value = book.Price;
                worksheet.Cells[i + 2, 9].Value = book.Image;
            }

            worksheet.Cells.AutoFitColumns();

            var bytes = package.GetAsByteArray();
            return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"books_export_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx");
        }

        [HttpGet("books/json")]
        public async Task<IActionResult> ExportBooksToJson()
        {
            var books = await _context.Books.ToListAsync();
            var json = JsonSerializer.Serialize(books, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            var bytes = Encoding.UTF8.GetBytes(json);
            return File(bytes, "application/json", $"books_export_{DateTime.Now:yyyyMMdd_HHmmss}.json");
        }

        [HttpGet("users/csv")]
        public async Task<IActionResult> ExportUsersToCsv()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.UserName,
                    u.Email,
                    u.Name
                })
                .ToListAsync();

            using var memoryStream = new MemoryStream();
            using var writer = new StreamWriter(memoryStream, Encoding.UTF8);
            using var csv = new CsvWriter(writer, System.Globalization.CultureInfo.InvariantCulture);

            csv.WriteRecords(users);
            await writer.FlushAsync();

            var bytes = memoryStream.ToArray();
            return File(bytes, "text/csv", $"users_export_{DateTime.Now:yyyyMMdd_HHmmss}.csv");
        }

        [HttpGet("bestsellers/csv")]
public async Task<IActionResult> ExportBestsellersToCsv()
{
    var bestsellers = await _context.Bestsellers
        .Select(b => new
        {
            b.Id,
            b.Title,
            b.Author,
            b.Rating,
            b.Year,
            b.Image
        })
        .ToListAsync();
    
    using var memoryStream = new MemoryStream();
    using var writer = new StreamWriter(memoryStream, Encoding.UTF8);
    using var csv = new CsvWriter(writer, System.Globalization.CultureInfo.InvariantCulture);
    
    csv.WriteRecords(bestsellers);
    await writer.FlushAsync();
    
    var bytes = memoryStream.ToArray();
    return File(bytes, "text/csv", $"bestsellers_export_{DateTime.Now:yyyyMMdd_HHmmss}.csv");
}

[HttpGet("bestsellers/excel")]
public async Task<IActionResult> ExportBestsellersToExcel()
{
    var bestsellers = await _context.Bestsellers.ToListAsync();
    
    using var package = new ExcelPackage();
    var worksheet = package.Workbook.Worksheets.Add("Bestsellers");
    
    worksheet.Cells[1, 1].Value = "Id";
    worksheet.Cells[1, 2].Value = "Title";
    worksheet.Cells[1, 3].Value = "Author";
    worksheet.Cells[1, 4].Value = "Rating";
    worksheet.Cells[1, 5].Value = "Year";
    worksheet.Cells[1, 6].Value = "Image";
    
    for (int i = 0; i < bestsellers.Count; i++)
    {
        var b = bestsellers[i];
        worksheet.Cells[i + 2, 1].Value = b.Id;
        worksheet.Cells[i + 2, 2].Value = b.Title;
        worksheet.Cells[i + 2, 3].Value = b.Author;
        worksheet.Cells[i + 2, 4].Value = b.Rating;
        worksheet.Cells[i + 2, 5].Value = b.Year.ToString("yyyy-MM-dd");
        worksheet.Cells[i + 2, 6].Value = b.Image;
    }
    
    worksheet.Cells.AutoFitColumns();
    
    var bytes = package.GetAsByteArray();
    return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
        $"bestsellers_export_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx");
}

[HttpGet("bestsellers/json")]
public async Task<IActionResult> ExportBestsellersToJson()
{
    var bestsellers = await _context.Bestsellers.ToListAsync();
    var json = JsonSerializer.Serialize(bestsellers, new JsonSerializerOptions 
    { 
        WriteIndented = true 
    });
    
    var bytes = Encoding.UTF8.GetBytes(json);
    return File(bytes, "application/json", $"bestsellers_export_{DateTime.Now:yyyyMMdd_HHmmss}.json");
}


        [HttpGet("reports/books-summary")]
public async Task<IActionResult> ExportBooksSummaryReport()
{
    string cacheKey = "books_summary_report";
    string cachedReport = await _redis.StringGetAsync(cacheKey);

    if (!string.IsNullOrEmpty(cachedReport))
    {
        // Return cached report
        var bytes = Encoding.UTF8.GetBytes(cachedReport);
        return File(bytes, "application/json", $"books_summary_report_{DateTime.Now:yyyyMMdd_HHmmss}.json");
    }

    // Compute report
    var totalBooks = await _context.Books.CountAsync();
    var booksByCategory = await _context.Books
        .GroupBy(b => b.Category)
        .Select(g => new { Category = g.Key, Count = g.Count() })
        .ToListAsync();

    var averageRating = await _context.Books.AverageAsync(b => b.Rating);
    var averagePrice = await _context.Books.AverageAsync(b => b.Price);

    var report = new
    {
        GeneratedAt = DateTime.Now,
        TotalBooks = totalBooks,
        AverageRating = Math.Round(averageRating, 2),
        AveragePrice = Math.Round(averagePrice, 2),
        BooksByCategory = booksByCategory
    };

    var json = JsonSerializer.Serialize(report, new JsonSerializerOptions { WriteIndented = true });

    // Save to Redis (expire in 10 minutes)
    await _redis.StringSetAsync(cacheKey, json, TimeSpan.FromMinutes(10));

    var reportBytes = Encoding.UTF8.GetBytes(json);
    return File(reportBytes, "application/json", $"books_summary_report_{DateTime.Now:yyyyMMdd_HHmmss}.json");
}


    }
}
