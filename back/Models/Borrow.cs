using System.ComponentModel.DataAnnotations;

namespace back.Models
{
public class Borrow
{
    public int Id { get; set; }
    public string BookTitle { get; set; }
    public string Author { get; set; }
    public string Email{get; set;}
    public DateTime MarrjaeLibrit { get; set; }
    public DateTime KthyerjaeLibrit { get; set; }
    public string Image { get; set; }
}
}