using System.ComponentModel.DataAnnotations;

namespace back.Models
{
public class Bestseller
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Rating { get; set; }
    public DateTime Year { get; set; }
}
}