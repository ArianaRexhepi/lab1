using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorrowController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BorrowController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var books = _context.Borrow.ToList();
            return Ok(books);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Borrow book)
        {
            _context.Borrow.Add(book);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Borrow book)
        {
            var existingBook = _context.Borrow.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.BookTitle = book.BookTitle;
            existingBook.Author = book.Author;
            existingBook.Username = book.Username;
            existingBook.MarrjaeLibrit = book.MarrjaeLibrit;
            existingBook.KthyerjaeLibrit= book.KthyerjaeLibrit;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingBook = _context.Borrow.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Borrow.Remove(existingBook);
            _context.SaveChanges();

            return Ok();
        }
    }
}
