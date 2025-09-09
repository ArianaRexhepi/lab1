import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("http://localhost:5267/api/bestsellers");
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero text-center">
        <h1 className="hero-title">
          Welcome to <span className="gradient-text">BookStore</span>
        </h1>
        <p className="hero-subtitle">
          Your cozy digital library — where bestsellers meet hidden gems.
        </p>
        <div className="hero-buttons">
          <a href="/bookuserlist" className="btn-primary">
            📖 Browse Books
          </a>
          <a href="/register" className="btn-secondary">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features fade-in">
  <div className="features-intro text-center" style={{ marginBottom: "30px" }}>
    
    <p className="section-subtitle">
      Discover, explore, and enjoy your next favorite book. Our bookstore combines
      curated collections, smart search, and a seamless experience to bring the
      joy of reading to your fingertips.
    </p>
  </div>

<section className="features-section">
  <div className="features-grid">
    {[
      { 
        title: "Advanced Search", 
        text: "Quickly find books with smart filters, AI recommendations, and personalized suggestions that help you discover your next favorite read effortlessly." 
      },
      { 
        title: "Curated Collections", 
        text: "Explore handpicked lists of books across genres, crafted by experts to match your unique reading taste and introduce you to hidden gems." 
      },
      { 
        title: "Seamless Experience", 
        text: "Enjoy a modern, mobile-first design built for readers, with smooth navigation, intuitive layouts, and fast performance on any device." 
      },
      {
        title: "Personalized Recommendations",
        text: "Get book suggestions tailored to your interests using smart algorithms that learn your reading preferences over time."
      }
    ].map((feature, i) => (
      <div className="feature-card" key={i}>
        <div className="feature-icon">{feature.icon}</div>
        <h5 className="gradient-text">{feature.title}</h5>
        <p>{feature.text}</p>
      </div>
    ))}
  </div>
</section>

</section>



     {/* Bestsellers Section */}
<section className="bestsellers-modern fade-in">
  <h2 className="section-title gradient-text text-center">
    This Month's Bestsellers
  </h2>
  <p className="text-center section-subtitle">
    The most popular picks from our readers
  </p>

  <div className="books-grid-modern">
    {books.map((book, index) => (
      <div key={index} className="book-card-modern">
        <div className="book-image-wrapper-modern">
          <img
            src={book.image || "https://via.placeholder.com/300x400/f9a8d4/ffffff?text=Book+Cover"}
            alt={book.title}
            className="book-card-image-modern"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x400/f9a8d4/ffffff?text=Book+Cover";
            }}
          />
        </div>
        <div className="book-card-details-modern">
          <h3 className="book-card-title-modern">{book.title}</h3>
          <p className="book-card-author-modern">By {book.author}</p>
          <div className="book-card-extra-modern">
            <span className="book-card-tag-modern">Bestseller</span>
            <span className="book-card-rating-modern">⭐ {book.rating}/5</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <section className="cta fade-in text-center">
        <div className="cta-card">
          <h3 className="gradient-text">Ready to Start Reading?</h3>
          <p>Join thousands of readers who’ve already found their next favorite book.</p>
          <div className="cta-buttons">
            <a href="/bookuserlist" className="btn-primary">Browse Now</a>
            <a href="/register" className="btn-secondary">Join Free</a>
          </div>
        </div>
      </section>

      Footer
      <footer className="footer text-center">
        <p>
          © 2023 <span className="gradient-text">BookStore</span> — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;

