using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BestsellersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BestsellersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Bestsellers.ToListAsync();
            return Ok(books);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBestsellerAsync(int id)
        {
            var existingBook = await _context.Bestsellers.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            } 
            return Ok(existingBook);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Bestseller book)
        {
            await _context.Bestsellers.AddAsync(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, Bestseller book)
        {
            var existingBook = await _context.Bestsellers.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Rating = book.Rating;
            existingBook.Year = book.Year;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var existingBook = await _context.Bestsellers.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Bestsellers.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
