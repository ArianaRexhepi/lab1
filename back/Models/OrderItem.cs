using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        [Required]
        public int BookId { get; set; }

        public string BookTitle { get; set; } = string.Empty;
        public string BookAuthor { get; set; } = string.Empty;
        public string BookImage { get; set; } = string.Empty;

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        // Link to Order
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
