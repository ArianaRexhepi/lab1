using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SetupController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public SetupController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin()
        {
            try
            {
                // Create roles if they don't exist
                if (!await _roleManager.RoleExistsAsync("Admin"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                }
                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }

                // Create first admin user
                var admin1 = new AppUser
                {
                    UserName = "teacher",
                    Email = "teacher@gmail.com",
                    EmailConfirmed = true
                };

                var existingAdmin1 = await _userManager.FindByEmailAsync(admin1.Email);
                if (existingAdmin1 == null)
                {
                    var result1 = await _userManager.CreateAsync(admin1, "Teacher123");
                    if (result1.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(admin1, "Admin");
                        await _userManager.AddToRoleAsync(admin1, "User");
                    }
                }

                // Create second admin user
                var admin2 = new AppUser
                {
                    UserName = "admin",
                    Email = "admin@bookstore.com",
                    EmailConfirmed = true
                };

                var existingAdmin2 = await _userManager.FindByEmailAsync(admin2.Email);
                if (existingAdmin2 == null)
                {
                    var result2 = await _userManager.CreateAsync(admin2, "Admin123");
                    if (result2.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(admin2, "Admin");
                        await _userManager.AddToRoleAsync(admin2, "User");
                    }
                }

                return Ok(new { 
                    message = "Admin users created successfully!",
                    users = new[] {
                        new { email = "teacher@gmail.com", password = "Teacher123" },
                        new { email = "admin@bookstore.com", password = "Admin123" }
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "API is working!" });
        }
    }
}
