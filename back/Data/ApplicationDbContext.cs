using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using back.Models;

namespace back.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Bestseller> Bestsellers { get; set; }
        public DbSet<Borrow> Borrow { get; set; }
        public DbSet<Recommended> Recommended { get; set; }
        public DbSet<Personi> Personi { get; set; }
        public DbSet<Banka> Banka { get; set; }
        public DbSet<Cart> Carts { get; set; }

    }
}
