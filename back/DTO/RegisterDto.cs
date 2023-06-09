using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.[a-z])(?=.[A-Z]).{6,16}$", ErrorMessage = "Passwords must be 6 char contain an upper and lower case")]
        public string Password { get; set; }
        

    }
}