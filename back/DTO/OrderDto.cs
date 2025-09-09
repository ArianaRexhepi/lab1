public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public string Status { get; set; }
    public string PaymentMethod { get; set; }
    public string ShippingAddress { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
}
