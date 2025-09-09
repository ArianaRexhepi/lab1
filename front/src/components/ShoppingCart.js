import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faCreditCard,
  faLock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

function CheckoutForm({ cart, quantities, calculateTotal, calculateTax }) {
  const user = useSelector((state) => state.user); 

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await axios.post(
      "http://localhost:5267/api/order",
      {
        userId: user?.id,
        userEmail: user?.email,
        totalAmount: parseFloat(calculateTotal().toFixed(2)),
        taxAmount: parseFloat(calculateTax().toFixed(2)),
        paymentMethod: "Card",
        shippingAddress: address,
        orderItems: cart.map((item) => ({
          bookId: item.id,
          bookTitle: item.title,
          bookAuthor: item.author,
          bookImage: item.image,
          quantity: quantities[item.id] || 1,
          unitPrice: parseFloat(item.price),
          totalPrice: parseFloat(item.price) * (quantities[item.id] || 1),
        })),
      },
      {
        headers: { Authorization: `Bearer ${user?.token}` }, // if you use JWT
      }
    );

    // ✅ Clear cart both frontend & backend
    await Promise.all(
      cart.map((item) =>
        axios.delete(`http://localhost:5267/api/cart/${item.id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
      )
    );

    setMessage("✅ Payment successful!");
    navigate("/success"); // go to success page

  } catch (err) {
    console.error(err);
    setMessage("Error: " + err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label-modern">Name</label>
          <input
            type="text"
            className="form-control-modern"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label-modern">Email</label>
          <input
            type="email"
            className="form-control-modern"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label-modern">Address</label>
          <input
            type="text"
            className="form-control-modern"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main Street"
            required
          />
        </div>
      </div>

      {message && <p className="text-danger">{message}</p>}

      <div className="text-center mt-4 d-flex justify-content-center gap-3">
  <button className="btn-secondary-modern" onClick={() => setShowPayment(false)}>
    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
    Back to Cart
  </button>
  <button type="submit" className="btn-modern" style={{ minWidth: "200px" }} disabled={loading}>
    {loading ? "Processing..." : `Pay $${calculateTotal().toFixed(2)}`}
  </button>
</div>

    </form>
  );
}

function ShoppingCart() {
  const user = useSelector((state) => state.user); // <-- add this line
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user?.token) return; // skip if no user
        const res = await axios.get("http://localhost:5267/api/cart", {
          headers: { Authorization: `Bearer ${user.token}` }, // your JWT
        });

        setCart(res.data);
        const initialQuantities = {};
        res.data.forEach((item) => (initialQuantities[item.id] = 1));
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user?.token]); // run again if token changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5267/api/cart/${id}`);
      setCart(cart.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantityChange = (id, change) => {
    const newQuantity = Math.max(1, (quantities[id] || 1) + change);
    setQuantities({ ...quantities, [id]: newQuantity });
  };

  const calculateSubtotal = () =>
    cart.reduce(
      (total, item) =>
        total + parseFloat(item.price) * (quantities[item.id] || 1),
      0
    );

  const calculateTax = () => calculateSubtotal() * 0.08;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  if (loading)
    return (
      <div className="container-modern text-center">
        <h3 className="text-gradient">Loading Your Cart...</h3>
      </div>
    );

  return (
    <div className="container-modern mt-5">
      {showPayment ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-4">
              
              <h1 className="text-gradient">Payment Information</h1>
              <p className="text-muted">Complete your purchase securely</p>
            </div>
            <div className="card-modern">
              <div className="card-modern-body">
                
                <CheckoutForm
                  cart={cart}
                  quantities={quantities}
                  calculateTotal={calculateTotal}
                  calculateTax={calculateTax}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Cart view */}
          <div className="cart-header text-center mb-5 fade-in">
            <h1 className="text-gradient mb-2">Shopping Cart</h1>
            <p className="text-muted fs-5">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          {cart.length === 0 ? (
            <div className="text-center py-5 fade-in">
              <h3 className="text-gradient mb-3">Your Cart is Empty</h3>
              <button
                className="btn-modern"
                onClick={() => navigate("/bookuserlist")}
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="row fade-in">
              <div className="col-lg-8 mb-4">
                <div className="card-modern">
                  <div className="card-modern-header">
                    <h5 className="mb-0">Cart Items</h5>
                  </div>
                  <div className="card-modern-body p-0">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <img
                              src={
                                item.image ||
                                "https://via.placeholder.com/100x150/6366f1/ffffff?text=Book"
                              }
                              alt={item.title}
                              className="cart-item-image"
                            />
                          </div>
                          <div className="col-md-4">
                            <h6 className="cart-item-title">{item.title}</h6>
                            <p className="cart-item-author text-muted">
                              By {item.author}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span className="quantity-display">
                                {quantities[item.id] || 1}
                              </span>
                              <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="cart-item-price">
                              $
                              {(
                                parseFloat(item.price) *
                                (quantities[item.id] || 1)
                              ).toFixed(2)}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <button
                              className="btn-danger-modern"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card-modern">
                  <div className="card-modern-header">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-modern-body">
                    <div className="order-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="summary-row">
                        <span>Tax (8%)</span>
                        <span>${calculateTax().toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="summary-row total-row">
                        <strong>Total</strong>
                        <span>
                          <strong>${calculateTotal().toFixed(2)}</strong>
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn-modern w-100 mt-3"
                      onClick={() => setShowPayment(true)}
                    >
                      <FontAwesomeIcon icon={faCreditCard} className="me-2" />
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
