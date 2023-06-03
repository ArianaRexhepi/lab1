using System.ComponentModel.DataAnnotations;

namespace back.Models
{
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public DateTime Timestamp { get; set; }
    public string Image { get; set; }
    public int Price { get; set; }
}
}