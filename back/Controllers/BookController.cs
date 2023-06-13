using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public readonly IHttpContextAccessor _accessor;

        public BookController(ApplicationDbContext context, IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookAsync(int id)
        {
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }
            return Ok(existingBook);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest();
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

        [HttpGet("userFavourite")]
        public async Task<IActionResult> GetFavorites()
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

            return Ok(user.Books);
        }

        [HttpPost("addFavorite")]
        public async Task<IActionResult> FavoriteAsync(Book book)
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

            user.Books.Add(book);

            await _context.SaveChangesAsync();

            return Ok();

        }
        [HttpDelete("removeFavorite/{id}")]
        public async Task<IActionResult> RemoveFavorite(int id)
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Books).FirstOrDefaultAsync(a => a.Email == userEmail);

            var userBook = user.Books.Where(a => a.Id == id).FirstOrDefault();

            user.Books.Remove(userBook);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
