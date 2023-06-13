import React, { useState } from "react";
import './homepage.css';
import image4 from "./images/image4.jpeg";
import image7 from "./images/image7.jpg";
import image8 from "./images/image8.jpg";

const Recbooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);

  const recommendedBooks = [
    {
      title: "Love in the Brain",
      author: "Ali Hazelwood",
      coverImage: image4,
    },
    {
      title: "Book Title 2",
      author: "Author 2",
      coverImage: image8,
    },
    {
      title: "Book Title 3",
      author: "Author 3",
      coverImage: image7,
    },
    // Add more books as needed
  ];

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null);
  };

  return (
    <div className="rec-books">
      <div className="rec-books-container">
        <div className="rec-books-header">
          <h3>Recommended Books</h3>
        </div>
        <div className="rec-books-content">
          <p>
            Whether you're a seasoned reader or just starting your literary
            journey, this carefully curated selection of books is designed to
            provide you with a diverse range of captivating reads.
          </p>
        </div>
      </div>
      
      {selectedBook ? (
        <div className="mt-3">
          <div className="fav-container">
            <button onClick={handleBackClick} className="back-button">
              <b>Go Back</b>
            </button>
          </div>
          <div className="fav-details">
            <div className="fav-info">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="book-image"
              />
              <div className="fav-box">
                <h2 className="fav-title">{selectedBook.title}</h2>
                <p className="fav-author">By {selectedBook.author}</p>

                <p className="fav-description">{selectedBook.description}</p>
                <h2 className="fav-category">{selectedBook.category}</h2>
                <div className="fav-rating">
                  <span className="rating-label">Rating:</span>
                  <span className="rating-value">{selectedBook.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-container">
          {recommendedBooks.map((book, index) => (
            <div
              key={index}
              className="book-card"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={book.image}
                alt={book.title}
                className="book-card-image"
              />
              <div className="book-card-details">
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-author">By {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recbooks;
