import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, 
  faEnvelope, 
  faCrown, 
  faEdit, 
  faCog, 
  faSignOutAlt,
  faBook,
  faHeart,
  faShoppingCart,
  faHistory,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function PersonalProfile() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalBooks: 0,
    favorites: 0,
    cartItems: 0,
    orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Fetch user statistics
        const [favoritesRes, cartRes, orderRes] = await Promise.all([
          axios.get("http://localhost:5267/api/book/userFavourite"),
          axios.get("http://localhost:5267/api/cart"),
          axios.get("http://localhost:5267/api/order/my-orders")
        ]);
        
        setUserStats({
          favorites: favoritesRes.data?.length || 0,
          cartItems: cartRes.data?.length || 0,
          orders: orderRes.data?.length || 0
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (state.user) {
      fetchUserStats();
    }
  }, [state.user]);

  const isAdmin = state.user?.userRoles?.includes("Admin") || false;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleEditProfile = () => {
    // This would open a modal or navigate to edit profile page
    console.log("Edit profile clicked");
  };

  if (!state.user) {
    return (
      <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h3 className="text-gradient mb-3">Please Log In</h3>
          <p className="text-muted mb-4">You need to be logged in to view your profile.</p>
          <button 
            className="btn-modern"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-modern mt-5">
      {/* Profile Header */}
      <div className="profile-header text-center mb-5 fade-in">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <FontAwesomeIcon icon={faUser} size="3x" />
          </div>
          {/* {isAdmin && (
            <div className="admin-badge">
              <FontAwesomeIcon icon={faCrown} />
              Admin
            </div>
          )} */}
        </div>
        <h1 className="text-gradient mb-2">{state.user.username}</h1>
        <p className="text-muted fs-5">{state.user.email}</p>
        <div className="profile-actions">
          <button className="btn-modern" onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit Profile
          </button>
          <button className="btn-secondary-modern" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="row justify-content-center mb-5 fade-in">
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="stat-card-modern">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="stat-content">
              <h3 className="text-gradient">{userStats.favorites}</h3>
              <p>Favorites</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="stat-card-modern">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <div className="stat-content">
              <h3 className="text-gradient">{userStats.cartItems}</h3>
              <p>Cart Items</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="stat-card-modern">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHistory} />
            </div>
            <div className="stat-content">
              <h3 className="text-gradient">{userStats.orders}</h3>
              <p>Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="row fade-in">
        <div className="col-lg-8 mb-4">
          <div className="card-modern">
            <div className="card-modern-header">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Profile Information
              </h5>
            </div>
            <div className="card-modern-body">
              <div className="profile-details">
                <div className="detail-row">
                  <div className="detail-label">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Username
                  </div>
                  <div className="detail-value">{state.user.username}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Email
                  </div>
                  <div className="detail-value">{state.user.email}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">
                    <FontAwesomeIcon icon={faCrown} className="me-2" />
                    Role
                  </div>
                  <div className="detail-value">
                    <span className={`role-badge ${isAdmin ? 'admin' : 'user'}`}>
                      {isAdmin ? 'Administrator' : 'User'}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">
                    <FontAwesomeIcon icon={faChartBar} className="me-2" />
                    Member Since
                  </div>
                  <div className="detail-value">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card-modern">
            <div className="card-modern-header">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faCog} className="me-2" />
                Quick Actions
              </h5>
            </div>
            <div className="card-modern-body">
              <div className="quick-actions">
                <button 
                  className="action-item"
                  onClick={() => navigate('/myfavorites')}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <span>My Favorites</span>
                </button>
                <button 
                  className="action-item"
                  onClick={() => navigate('/mycart')}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Shopping Cart</span>
                </button>
                <button 
                  className="action-item"
                  onClick={() => navigate('/bookuserlist')}
                >
                  <FontAwesomeIcon icon={faBook} />
                  <span>Browse Books</span>
                </button>
                {isAdmin && (
                  <button 
                    className="action-item"
                    onClick={() => navigate('/admin')}
                  >
                    <FontAwesomeIcon icon={faCrown} />
                    <span>Admin Panel</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

                    </div>
  );
}

export default PersonalProfile;
