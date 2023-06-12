using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class Recommended
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }
        public DateTime Year { get; set; }
        public string Image { get; set; }
    }
}