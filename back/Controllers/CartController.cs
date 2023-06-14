using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _accessor;

        public CartController(ApplicationDbContext context, IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Carts).FirstOrDefaultAsync(a => a.Email == userEmail);
            return Ok(user.Carts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(int id)
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Carts).FirstOrDefaultAsync(a => a.Email == userEmail);

            var book = user.Carts.Where(a => a.BookId == id).FirstOrDefault();

            return Ok(book);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(Book book)
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Carts).FirstOrDefaultAsync(a => a.Email == userEmail);

            var cart = new Cart
            {
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Rating = book.Rating,
                Year = book.Year,
                Image = book.Image,
                Price = book.Price,
                BookId = book.Id
            };

            user.Carts.Add(cart);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var userEmail = _accessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
            var user = await _context.Users.Include(a => a.Carts).FirstOrDefaultAsync(a => a.Email == userEmail);

            var cart = user.Carts.Where(a => a.Id == id).FirstOrDefault();

            user.Carts.Remove(cart);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
