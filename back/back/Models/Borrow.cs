using System.ComponentModel.DataAnnotations;

namespace back.Models
{
public class Borrow
{
    public int Id { get; set; }
    public string BookTitle { get; set; }
    public string Author { get; set; }
    public string Username{get; set;}
    public DateTime MarrjaeLibrit { get; set; }
    public DateTime KthyerjaeLibrit { get; set; }
}
}