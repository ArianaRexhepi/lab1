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
        public IActionResult Get()
        {
            var books = _context.Bestsellers.ToList();
            return Ok(books);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Bestseller book)
        {
            _context.Bestsellers.Add(book);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Bestseller book)
        {
            var existingBook = _context.Bestsellers.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Rating = book.Rating;
            existingBook.Year = book.Year;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingBook = _context.Bestsellers.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Bestsellers.Remove(existingBook);
            _context.SaveChanges();

            return Ok();
        }
    }
}
