using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using CsvHelper;
using System.Text;
using System.Text.Json;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ImportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ImportController(ApplicationDbContext context)
        {
            _context = context;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        [HttpPost("books/csv")]
        public async Task<IActionResult> ImportBooksFromCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (!file.FileName.EndsWith(".csv"))
            {
                return BadRequest("File must be a CSV file.");
            }

            try
            {
                using var stream = file.OpenReadStream();
                using var reader = new StreamReader(stream);
                using var csv = new CsvReader(reader, System.Globalization.CultureInfo.InvariantCulture);
                
                var books = csv.GetRecords<Book>().ToList();
                
                // Validate books
                var validBooks = new List<Book>();
                var errors = new List<string>();
                
                foreach (var book in books)
                {
                    if (string.IsNullOrEmpty(book.Title) || string.IsNullOrEmpty(book.Author))
                    {
                        errors.Add($"Book with ID {book.Id} is missing required fields (Title or Author)");
                        continue;
                    }
                    
                    // Check if book already exists
                    var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title && b.Author == book.Author);
                    if (existingBook == null)
                    {
                        validBooks.Add(book);
                    }
                }
                
                if (validBooks.Any())
                {
                    await _context.Books.AddRangeAsync(validBooks);
                    await _context.SaveChangesAsync();
                }
                
                var result = new
                {
                    Success = true,
                    ImportedCount = validBooks.Count,
                    SkippedCount = books.Count - validBooks.Count,
                    Errors = errors
                };
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error importing CSV: {ex.Message}");
            }
        }

        [HttpPost("books/excel")]
        public async Task<IActionResult> ImportBooksFromExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (!file.FileName.EndsWith(".xlsx") && !file.FileName.EndsWith(".xls"))
            {
                return BadRequest("File must be an Excel file.");
            }

            try
            {
                using var stream = file.OpenReadStream();
                using var package = new ExcelPackage(stream);
                var worksheet = package.Workbook.Worksheets[0];
                
                var books = new List<Book>();
                var errors = new List<string>();
                
                var rowCount = worksheet.Dimension.Rows;
                
                for (int row = 2; row <= rowCount; row++) // Skip header row
                {
                    try
                    {
                        var book = new Book
                        {
                            Title = worksheet.Cells[row, 2].Value?.ToString() ?? "",
                            Author = worksheet.Cells[row, 3].Value?.ToString() ?? "",
                            Description = worksheet.Cells[row, 4].Value?.ToString() ?? "",
                            Category = worksheet.Cells[row, 5].Value?.ToString() ?? "",
                            Rating = int.TryParse(worksheet.Cells[row, 6].Value?.ToString(), out var rating) ? rating : 0,
                            Year = DateTime.TryParse(worksheet.Cells[row, 7].Value?.ToString(), out var year) ? year : DateTime.Now,
                            Price = int.TryParse(worksheet.Cells[row, 8].Value?.ToString(), out var price) ? price : 0,
                            Image = worksheet.Cells[row, 9].Value?.ToString() ?? ""
                        };
                        
                        if (string.IsNullOrEmpty(book.Title) || string.IsNullOrEmpty(book.Author))
                        {
                            errors.Add($"Row {row} is missing required fields (Title or Author)");
                            continue;
                        }
                        
                        // Check if book already exists
                        var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title && b.Author == book.Author);
                        if (existingBook == null)
                        {
                            books.Add(book);
                        }
                    }
                    catch (Exception ex)
                    {
                        errors.Add($"Error processing row {row}: {ex.Message}");
                    }
                }
                
                if (books.Any())
                {
                    await _context.Books.AddRangeAsync(books);
                    await _context.SaveChangesAsync();
                }
                
                var result = new
                {
                    Success = true,
                    ImportedCount = books.Count,
                    SkippedCount = rowCount - 1 - books.Count,
                    Errors = errors
                };
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error importing Excel file: {ex.Message}");
            }
        }

        [HttpPost("books/json")]
        public async Task<IActionResult> ImportBooksFromJson(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (!file.FileName.EndsWith(".json"))
            {
                return BadRequest("File must be a JSON file.");
            }

            try
            {
                using var stream = file.OpenReadStream();
                using var reader = new StreamReader(stream);
                var json = await reader.ReadToEndAsync();
                
                var books = JsonSerializer.Deserialize<List<Book>>(json);
                
                if (books == null || !books.Any())
                {
                    return BadRequest("No valid books found in JSON file.");
                }
                
                // Validate books
                var validBooks = new List<Book>();
                var errors = new List<string>();
                
                foreach (var book in books)
                {
                    if (string.IsNullOrEmpty(book.Title) || string.IsNullOrEmpty(book.Author))
                    {
                        errors.Add($"Book is missing required fields (Title or Author)");
                        continue;
                    }
                    
                    // Check if book already exists
                    var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title && b.Author == book.Author);
                    if (existingBook == null)
                    {
                        validBooks.Add(book);
                    }
                }
                
                if (validBooks.Any())
                {
                    await _context.Books.AddRangeAsync(validBooks);
                    await _context.SaveChangesAsync();
                }
                
                var result = new
                {
                    Success = true,
                    ImportedCount = validBooks.Count,
                    SkippedCount = books.Count - validBooks.Count,
                    Errors = errors
                };
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error importing JSON file: {ex.Message}");
            }
        }

        [HttpGet("template/csv")]
        public IActionResult DownloadCsvTemplate()
        {
            var template = "Id,Title,Author,Description,Category,Rating,Year,Price,Image\n" +
                          "1,Sample Book,Sample Author,Sample Description,Fiction,5,2023-01-01,25,https://example.com/image.jpg";
            
            var bytes = Encoding.UTF8.GetBytes(template);
            return File(bytes, "text/csv", "books_import_template.csv");
        }

        [HttpGet("template/excel")]
        public IActionResult DownloadExcelTemplate()
        {
            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Books Template");
            
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
            
            // Add sample data
            worksheet.Cells[2, 1].Value = "1";
            worksheet.Cells[2, 2].Value = "Sample Book";
            worksheet.Cells[2, 3].Value = "Sample Author";
            worksheet.Cells[2, 4].Value = "Sample Description";
            worksheet.Cells[2, 5].Value = "Fiction";
            worksheet.Cells[2, 6].Value = "5";
            worksheet.Cells[2, 7].Value = "2023-01-01";
            worksheet.Cells[2, 8].Value = "25";
            worksheet.Cells[2, 9].Value = "https://example.com/image.jpg";
            
            worksheet.Cells.AutoFitColumns();
            
            var bytes = package.GetAsByteArray();
            return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                "books_import_template.xlsx");
        }
    }
}
