import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import axios from "axios";

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/bestsellers");
      setBooks(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="container-modern">
      {/* Hero Section */}
      <div className="page-header-modern fade-in">
        <h1 className="page-title-modern">
          📚 Welcome to <span className="text-gradient">BookHub</span>
        </h1>
        <p className="page-subtitle-modern">
          Discover, explore, and enjoy the world's most comprehensive digital library. 
          Find your next favorite book from our vast collection of bestsellers, classics, and hidden gems.
        </p>
      </div>

      {/* Features Section */}
      <div className="row mb-5 fade-in">
        <div className="col-md-4 mb-4">
          <div className="card-modern text-center">
            <div className="card-modern-body">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h5 className="text-gradient">Advanced Search</h5>
              <p className="text-muted">
                Find exactly what you're looking for with our powerful search filters and smart recommendations.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card-modern text-center">
            <div className="card-modern-body">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h5 className="text-gradient">Curated Collections</h5>
              <p className="text-muted">
                Discover handpicked bestsellers and recommended reads tailored to your interests.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card-modern text-center">
            <div className="card-modern-body">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h5 className="text-gradient">Modern Experience</h5>
              <p className="text-muted">
                Enjoy a beautiful, responsive interface designed for the best reading experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bestsellers Section */}
      <div className="fade-in">
        <div className="text-center mb-4">
          <h2 className="text-gradient">🏆 This Month's Bestsellers</h2>
          <p className="text-muted">Discover the most popular books that everyone's talking about</p>
        </div>
        
        <div className="books-grid-modern">
          {books.map((book, index) => (
            <div key={index} className="book-card-modern">
              <img
                src={book.image || 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover'}
                alt={book.title}
                className="book-card-image-modern"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover';
                }}
              />
              <div className="book-card-details-modern">
                <h3 className="book-card-title-modern">{book.title}</h3>
                <p className="book-card-author-modern">By {book.author}</p>
                <div className="book-card-extra-modern">
                  <span className="book-card-tag-modern">Bestseller</span>
                  <span className="book-card-rating-modern">
                    ⭐ {book.rating}/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5 fade-in">
        <div className="card-modern" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card-modern-body">
            <h3 className="text-gradient mb-3">Ready to Start Reading?</h3>
            <p className="text-muted mb-4">
              Join thousands of book lovers who have already discovered their next favorite read.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <a href="/bookuserlist" className="btn-modern">
                📖 Browse Books
              </a>
              <a href="/register" className="btn-secondary-modern">
                🚀 Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 py-4" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <p className="text-muted mb-0">
          <i>
            @2024 by <span className="text-gradient">BookHub</span>. All Rights Reserved.
          </i>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
