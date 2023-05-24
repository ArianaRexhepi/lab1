using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Bestseller> Bestsellers { get; set; }
    
    }
}
