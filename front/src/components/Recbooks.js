import React, { useState } from "react";
import './homepage.css';
import image4 from "./images/image4.jpeg";
import image7 from "./images/image7.jpg";
import image8 from "./images/image8.jpg";

const Recbooks = () => {


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
      
      <div className="recommended-books-grid">
        {recommendedBooks.map((book, index) => (
          <div className="recommended-book-card" key={index}>
            <img
              className="recommended-book-cover"
              src={book.coverImage}
              alt={book.title}
            />
            <div className="recommended-book-details">
              <h3 className="recommended-book-title">{book.title}</h3>
              <p className="recommended-book-author">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recbooks;
