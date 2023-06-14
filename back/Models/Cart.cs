using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public DateTime Year { get; set; }
        public string Image { get; set; }
        public int Price { get; set; } 
        public int BookId { get; set; }
    }
}