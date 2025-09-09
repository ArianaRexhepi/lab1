using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using back.Data;
using back.Models;
using System.Security.Claims;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class OrderItemRequest
        {
            public int BookId { get; set; }
            public string BookTitle { get; set; }
            public string BookAuthor { get; set; }
            public string BookImage { get; set; }
            public int Quantity { get; set; }
            public decimal UnitPrice { get; set; }
            public decimal TotalPrice { get; set; }
        }

        public class OrderRequest
        {
            public string UserId { get; set; }
            public string UserEmail { get; set; }
            public decimal TotalAmount { get; set; }
            public decimal TaxAmount { get; set; }
            public string PaymentMethod { get; set; }
            public string CardNumber { get; set; }
            public string Expiry { get; set; }
            public string CVC { get; set; }
            public string ShippingAddress { get; set; }
            public List<OrderItemRequest> OrderItems { get; set; }
        }

        [HttpPost]
[Authorize]
public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
{
    if (request == null || request.OrderItems == null || !request.OrderItems.Any())
        return BadRequest("Invalid order data.");

    // Get user ID and email from token instead of trusting frontend
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

    if (string.IsNullOrEmpty(userId))
        return Unauthorized("User not logged in.");

    var order = new Order
    {
        UserId = userId,
        UserEmail = userEmail,
        TotalAmount = request.TotalAmount,
        TaxAmount = request.TaxAmount,
        PaymentMethod = request.PaymentMethod,
        ShippingAddress = request.ShippingAddress,
        OrderDate = DateTime.UtcNow,
        OrderItems = request.OrderItems.Select(i => new OrderItem
        {
            BookId = i.BookId,
            BookTitle = i.BookTitle,
            BookAuthor = i.BookAuthor,
            BookImage = i.BookImage,
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice,
            TotalPrice = i.TotalPrice
        }).ToList()
    };

    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Payment successful!",
        orderId = order.Id,
        totalAmount = order.TotalAmount
    });
}


       [HttpGet("my-orders")]
public async Task<IActionResult> GetMyOrders()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userId == null) return Unauthorized();

    var orders = await _context.Orders
        .Where(o => o.UserId == userId)
        .Include(o => o.OrderItems)
        .ToListAsync();

    // Map to DTOs
    var orderDtos = orders.Select(o => new OrderDto
    {
        Id = o.Id,
        OrderDate = o.OrderDate,
        TotalAmount = o.TotalAmount,
        TaxAmount = o.TaxAmount,
        Status = o.Status,
        PaymentMethod = o.PaymentMethod,
        ShippingAddress = o.ShippingAddress,
        OrderItems = o.OrderItems.Select(oi => new OrderItemDto
        {
            Id = oi.Id,
            BookTitle = oi.BookTitle,
            BookAuthor = oi.BookAuthor,
            BookImage = oi.BookImage,
            Quantity = oi.Quantity,
            TotalPrice = oi.TotalPrice
        }).ToList()
    }).ToList();

    return Ok(orderDtos);
}
    }
}
