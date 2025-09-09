public class OrderItemDto
{
    public int Id { get; set; }
    public string BookTitle { get; set; }
    public string BookAuthor { get; set; }
    public string BookImage { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
}