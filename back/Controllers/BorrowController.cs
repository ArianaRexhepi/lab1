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
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Borrow.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBorrowAsync(int id)
        {
            var existingBook = await _context.Borrow.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            } 
            return Ok(existingBook);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Borrow book)
        {
           await  _context.Borrow.AddAsync(book);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, Borrow book)
        {
            var existingBook = await _context.Borrow.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Email = book.Email;
            existingBook.BookTitle = book.BookTitle;
            existingBook.Author = book.Author;
            existingBook.MarrjaeLibrit = book.MarrjaeLibrit;
            existingBook.KthyerjaeLibrit= book.KthyerjaeLibrit;

             _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
       public async Task<IActionResult> DeleteAsync(int id)
        {
            var existingBook = await _context.Borrow.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Borrow.Remove(existingBook);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
