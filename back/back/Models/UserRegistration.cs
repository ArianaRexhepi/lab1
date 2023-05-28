using System.ComponentModel.DataAnnotations;

namespace back.Models
{
public class UserRegistration
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public DateTime Year { get; set; }
}
}