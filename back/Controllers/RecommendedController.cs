using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecommendedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var recommended = await _context.Recommended.ToListAsync();
            return Ok(recommended);
        }

       [HttpGet("{id}")]
        public async Task<IActionResult> GetBookAsync(int id)
        {
            var existingBook = await _context.Recommended.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            } 
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(Book book)
        {
           await  _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, Book book)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Description = book.Description;
            existingBook.Rating = book.Rating;
            existingBook.Category = book.Category;
            existingBook.Year = book.Year;
            existingBook.Image = book.Image;
            existingBook.Price = book.Price;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
       public async Task<IActionResult> DeleteAsync(int id)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Books.Remove(existingBook);
           await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
