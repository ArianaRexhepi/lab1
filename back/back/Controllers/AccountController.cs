using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    [HttpPost("signin")]
    public IActionResult SignIn([FromBody] SignInModel model)
    {
        // Implement your sign-in logic here
        // Check username/password, validate credentials, etc.

        if (valid)
        {
            // Return a success response
            return Ok(new { message = "Sign-in successful" });
        }
        else
        {
            // Return an error response
            return BadRequest(new { message = "Invalid credentials" });
        }
    }
}

public class SignInModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}
