import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

function BookDetails() {
  const [selectedBook, setSelectedBook] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/book/${id}`);
      setSelectedBook(res.data);
      console.log("selectedBook", res.data);
    };
    const fetchFavorites = async () => {
      await axios
        .get(`http://localhost:5000/api/book/userFavourite/${id}`)
        .then((res) => {
          if (res.data) {
            setFound(true);
          }
        });
    };
    const fetchCart = async () => {
      await axios.get(`http://localhost:5000/api/cart/${id}`).then((res) => {
        if (res.data) {
          setCart(true);
          console.log("cart", res.data);
        }
      });
      setLoading(false);
    };
    fetch();
    fetchFavorites();
    fetchCart();
  }, []);

  const handleFavoritesClick = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/book/addFavorite", selectedBook)
        .then((res) => {
          setFound(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoritesRemove = async (e) => {
    if (selectedBook) {
      try {
        await axios
          .delete(
            `http://localhost:5000/api/book/removeFavorite/${selectedBook.id}`
          )
          .then(() => {
            setFound(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBackClick = () => {
    navigate("/bookuserlist");
  };

  const handleCartClick = async (e) => {
    try {
      await axios
        .post("http://localhost:5000/api/cart", selectedBook)
        .then((res) => {
          setCart(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartRemove = async (e) => {
    if (selectedBook) {
      try {
        await axios
          .delete(`http://localhost:5000/api/cart/${selectedBook.id}`)
          .then(() => {
            setCart(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!selectedBook || loading) {
    return (
      <div className="container-modern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-modern" style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem' }}></div>
          <h3 className="text-gradient">Loading Book Details...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container-modern">
      {/* Back Button */}
      <div className="mb-4 fade-in">
        <button 
          onClick={handleBackClick} 
          className="btn-secondary-modern"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          ← Back to Books
        </button>
      </div>

      {/* Book Details Card */}
      <div className="card-modern fade-in">
        <div className="card-modern-body">
          <div className="row">
            {/* Book Image */}
            <div className="col-md-4 mb-4">
              <div className="text-center">
                <img
                  src={selectedBook.image || 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Book+Cover'}
                  alt={selectedBook.title}
                  className="book-card-image-modern"
                  style={{ 
                    maxWidth: '100%', 
                    height: '500px', 
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Book+Cover';
                  }}
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="col-md-8">
              <div className="book-details-modern">
                <h1 className="book-title-modern text-gradient mb-3">
                  {selectedBook.title}
                </h1>
                
                <p className="book-author-modern mb-4" style={{ fontSize: '1.25rem' }}>
                  By <span className="text-gradient">{selectedBook.author}</span>
                </p>

                <div className="book-meta-modern mb-4">
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <span className="book-card-tag-modern" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      📚 {selectedBook.category}
                    </span>
                    <span className="book-card-rating-modern" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      ⭐ {selectedBook.rating}/5
                    </span>
                    <span className="book-card-tag-modern" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      💰 ${selectedBook.price}
                    </span>
                    <span className="book-card-tag-modern" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      📅 {new Date(selectedBook.year).getFullYear()}
                    </span>
                  </div>
                </div>

                <div className="book-description-modern mb-5">
                  <h4 className="text-gradient mb-3">📖 Description</h4>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.7', 
                    color: 'var(--text-secondary)',
                    textAlign: 'justify'
                  }}>
                    {selectedBook.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="book-actions-modern">
                  <div className="d-flex gap-3 flex-wrap">
                    {!found ? (
                      <button
                        className="btn-modern"
                        onClick={() => handleFavoritesClick(selectedBook)}
                        style={{ 
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          minWidth: '180px',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        ❤️ Add to Favorites
                      </button>
                    ) : (
                      <button
                        className="btn-modern"
                        onClick={() => handleFavoritesRemove()}
                        style={{ 
                          background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          minWidth: '180px',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                        💔 Remove from Favorites
                      </button>
                    )}
                    
                    {!cart ? (
                      <button 
                        className="btn-modern" 
                        onClick={handleCartClick}
                        style={{ 
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          minWidth: '180px',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faCartPlus} />
                        🛒 Add to Cart
                      </button>
                    ) : (
                      <button 
                        className="btn-modern" 
                        onClick={handleCartRemove}
                        style={{ 
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          minWidth: '180px',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faCartPlus} />
                        🗑️ Remove from Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Book Information */}
      <div className="row mt-4 fade-in">
        <div className="col-md-6">
          <div className="card-modern">
            <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <h5 className="mb-0">📊 Book Statistics</h5>
            </div>
            <div className="card-modern-body">
              <div className="row text-center">
                <div className="col-6">
                  <div className="stat-item">
                    <div style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>⭐</div>
                    <h4 className="text-gradient">{selectedBook.rating}/5</h4>
                    <small className="text-muted">Rating</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item">
                    <div style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>💰</div>
                    <h4 className="text-gradient">${selectedBook.price}</h4>
                    <small className="text-muted">Price</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card-modern">
            <div className="card-modern-header" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              <h5 className="mb-0">📝 Book Details</h5>
            </div>
            <div className="card-modern-body">
              <div className="book-details-list">
                <div className="detail-item">
                  <strong>📚 Category:</strong> {selectedBook.category}
                </div>
                <div className="detail-item">
                  <strong>📅 Published:</strong> {new Date(selectedBook.year).getFullYear()}
                </div>
                <div className="detail-item">
                  <strong>✍️ Author:</strong> {selectedBook.author}
                </div>
                <div className="detail-item">
                  <strong>🆔 Book ID:</strong> #{selectedBook.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
