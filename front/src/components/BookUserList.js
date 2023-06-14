import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookUserList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5267/api/book");
      setBooks(res.data);
      console.log("books", res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleBookClick = (bookId) => {
    navigate(`/bookuserlist/${bookId}`);
  };

  const handleSearch = () => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <>
        <div className="h1">
          <h1>
            <i>Book List</i>
          </h1>
        </div>
        <p>
          {" "}
          We believe that books have the power to inspire, educate, and
          entertain.
        </p>

        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </>

      <div className="book-container">
        {(searchResults.length > 0 ? searchResults : books).map(
          (book, index) => (
            <div
              key={index}
              className="book-card"
              onClick={() => handleBookClick(book.id)}
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
          )
        )}
      </div>
    </div>
  );
};

export default BookUserList;
