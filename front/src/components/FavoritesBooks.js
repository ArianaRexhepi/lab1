import React, { useEffect, useState } from "react";
import "./homepage.css";
import image4 from "./images/image4.jpeg";
import image8 from "./images/image8.jpg";
import image7 from "./images/image7.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const books = [
  {
    title: "Love in the Brain",
    author: "Ali Hazelwood",
    image: image4,
  },
  {
    title: "Book Title 2",
    author: "Author 2",
    Image: image8,
  },
  {
    title: "Book Title 3",
    author: "Author 3",
    coverImage: image7,
  },
  // Add more books as needed
];

const FavoriteBooks = () => {
  const [favBooks, setFavBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      await axios
        .get(`http://localhost:5267/api/book/userFavourite`)
        .then((res) => {
          console.log("favbookcontroller:", res.data);
          setFavBooks(res.data);
          console.log(res.data);
        });
    };
    fetchFavorites();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/bookuserlist/${bookId}`);
  };

  return (
    <>
    <br></br>
      <h3>My Favorites</h3>
      <p>Here is your list of your favorite books</p>
      <div className="book-container">
        {favBooks.map((book, index) => (
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
        ))}
      </div>
    </>
  );
};

export default FavoriteBooks;
