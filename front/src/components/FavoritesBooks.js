import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";


const FavoriteBooks = () => {
  const [favBooks, setFavBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5267/api/book/userFavourite`);
          console.log("favbookcontroller:", res.data);
          setFavBooks(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/bookuserlist/${bookId}`);
  };

  const handleRemoveFavorite = async (bookId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5267/api/book/removeFavorite/${bookId}`);
      setFavBooks(favBooks.filter(book => book.id !== bookId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const handleAddToCart = async (book, event) => {
    event.stopPropagation();
    try {
      await axios.post("http://localhost:5267/api/cart", book);
      // You could add a toast notification here
      console.log("Added to cart:", book.title);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading) {
    return (
      <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-modern" style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }}></div>
          <h3 className="text-gradient">Loading Your Favorites...</h3>
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
      {/* Header Section */}
      <div className="favorites-header text-center mb-5 fade-in">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <div style={{ fontSize: '3rem', marginRight: '1rem' }}></div>
          <div>
            <h1 className="text-gradient mb-2">My Favorites</h1>
            <p className="text-muted fs-5">
              {favBooks.length} {favBooks.length === 1 ? 'book' : 'books'}
            </p>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      {favBooks.length === 0 ? (
        <div className="text-center py-5 fade-in">
          <div style={{ fontSize: '5rem', marginBottom: '2rem' }}></div>
          <h3 className="text-gradient mb-3">No Favorites Yet</h3>
          <p className="text-muted mb-4">Start adding books to your favorites to see them here!</p>
          <button 
            className="btn-modern"
            onClick={() => navigate('/bookuserlist')}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="row g-4 fade-in">
  {favBooks.map((book, index) => {
    const cardStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    };

    const imageContainerStyle = {
      position: 'relative',
      width: '100%',
      paddingTop: '150%',
      overflow: 'hidden',
    };

    const imageStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s',
    };

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'opacity 0.3s',
    };

    const actionsStyle = {
      display: 'flex',
      gap: '0.5rem',
    };

    const actionBtnStyle = {
      background: 'white',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background 0.2s, color 0.2s',
    };

    const contentStyle = {
      padding: '1rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    };

    const titleStyle = {
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '0.25rem',
      lineHeight: 1.2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const authorStyle = {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '0.5rem',
    };

    const metaStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 500,
      fontSize: '0.9rem',
    };

    return (
      <div key={book.id || index} className="col-lg-3 col-md-4 col-sm-6">
        <div
          className="favorites-card"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('.overlay').style.opacity = 1;
            e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('.overlay').style.opacity = 0;
            e.currentTarget.querySelector('img').style.transform = 'scale(1)';
          }}
        >
          <div style={imageContainerStyle}>
            <img
              src={book.image || 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover'}
              alt={book.title}
              style={imageStyle}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover';
              }}
            />
            <div className="overlay" style={overlayStyle}>
              <div style={actionsStyle}>
                <button
                  style={actionBtnStyle}
                  onClick={() => handleBookClick(book.id)}
                  title="View Details"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  style={actionBtnStyle}
                  onClick={(e) => handleAddToCart(book, e)}
                  title="Add to Cart"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
                <button
                  style={actionBtnStyle}
                  onClick={(e) => handleRemoveFavorite(book.id, e)}
                  title="Remove from Favorites"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
          <div style={contentStyle}>
            <h5 style={titleStyle}>{book.title}</h5>
            <p style={authorStyle}>By {book.author}</p>
            <div style={metaStyle}>
              <span>⭐ {book.rating}/5</span>
              <span>${book.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

      )}

      {/* Quick Actions */}
      {favBooks.length > 0 && (
        <div className="text-center mt-5 fade-in">
          <div className="card-modern">
            <div className="card-modern-body">
              <h5 className="text-gradient mb-3">Quick Actions</h5>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button 
                  className="btn-modern"
                  onClick={() => navigate('/bookuserlist')}
                >
                  📚 Browse More Books
                </button>
                <button 
                  className="btn-modern"
                  onClick={() => navigate('/cart')}
                >
                  🛒 View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default FavoriteBooks;
