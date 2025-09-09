import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faReceipt, 
  faCalendar, 
  faDollarSign, 
  faBox,
  faEye,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";




const OrderHistory = () => {
  const user = useSelector((state) => state.user);
  const token = user?.token || localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // ensure your JWT is stored here
        if (!token) {
          setError("User not logged in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5267/api/order/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(
          err.response?.data?.message || "Failed to load order history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-modern" style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }}></div>
          <h3 className="text-gradient">Loading Order History...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
          <h3 className="text-gradient mb-3">Oops! Something went wrong</h3>
          <p className="text-muted">{error}</p>
          <button 
            className="btn-modern" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-modern mt-5">
      {/* Header */}
      <div className="order-history-header text-center mb-5 fade-in">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <div style={{ fontSize: '3rem', marginRight: '1rem' }}></div>
          <div>
            <h1 className="text-gradient mb-2">Order History</h1>
            <p className="text-muted fs-5">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-5 fade-in">
          <div style={{ fontSize: '5rem', marginBottom: '2rem' }}></div>
          <h3 className="text-gradient mb-3">No Orders Yet</h3>
          <p className="text-muted mb-4">You haven't made any purchases yet. Start shopping to see your orders here!</p>
          <button 
            className="btn-modern"
            onClick={() => navigate('/bookuserlist')}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list fade-in">
          {orders.map((order) => (
            <div key={order.id} className="order-card-modern mb-4">
              <div className="order-card-header">
                <div className="order-info">
                  <h5 className="order-number">
                    <FontAwesomeIcon icon={faReceipt} className="me-2" />
                    Order #{order.id}
                  </h5>
                  <div className="order-meta">
                    <span className="order-date">
                      <FontAwesomeIcon icon={faCalendar} className="me-1" />
                      {formatDate(order.orderDate)}
                    </span>
                    <span className={`order-status status-${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="order-total">
                  <FontAwesomeIcon icon={faDollarSign} className="me-1" />
                  ${order.totalAmount.toFixed(2)}
                </div>
              </div>

              <div className="order-items">
                <h6 className="mb-3">
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Items
                </h6>
                <div className="order-items-grid">
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={item.bookImage || 'https://via.placeholder.com/80x120/ec4899/ffffff?text=Book'}
                          alt={item.bookTitle}
                          className="order-item-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x120/ec4899/ffffff?text=Book';
                          }}
                        />
                        <div className="order-item-details">
                          <h6 className="order-item-title">{item.bookTitle}</h6>
                          <p className="order-item-author">By {item.bookAuthor}</p>
                          <div className="order-item-meta">
                            <span className="quantity">Qty: {item.quantity}</span>
                            <span className="price">${item.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items found</p>
                  )}

                </div>
              </div>

              <div className="order-summary">
                <div className="row">
                  <div className="col-md-6">
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>${(order.totalAmount - order.taxAmount).toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Tax:</span>
                      <span>${order.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="summary-item total">
                      <span><strong>Total:</strong></span>
                      <span><strong>${order.totalAmount.toFixed(2)}</strong></span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="order-details">
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                      <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {orders.length > 0 && (
        <div className="text-center mt-5 fade-in">
          <div className="card-modern">
            <div className="card-modern-body">
              <h5 className="text-gradient mb-3">Quick Actions</h5>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button 
                  className="btn-modern"
                  onClick={() => navigate('/bookuserlist')}
                >
                  <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                  Continue Shopping
                </button>
                <button 
                  className="btn-secondary-modern"
                  onClick={() => navigate('/myprofile')}
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
