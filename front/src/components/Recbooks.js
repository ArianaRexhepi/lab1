import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";

const Recbooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5267/api/recommended");
      setBooks(res.data);
    };
    fetch();
  }, []);

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

      <div className="fav-container">
        {books.map((book, index) => (
          <div
            key={index}
            className="fav-card"
          >
            <img src={book.image} alt={book.title} className="fav-card-image" />
            <div className="fav-card-details">
              <h3 className="fav-card-title">{book.title}</h3>
              <p className="fav-card-author">By {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recbooks;
