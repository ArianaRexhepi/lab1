using back.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class AppUser : IdentityUser
{
    public string Name { get; set; }
    public ICollection<Book> Books { get; set; }

}