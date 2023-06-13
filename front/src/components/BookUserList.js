import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const BookUserList = () => {
  const [books, setBooks] = useState([]);
  const [favBooks, setFavBooks] = useState([]);
  const [book, setBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    author: "",
    rating: "",
  });
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5267/api/book");
      setBooks(res.data);
      console.log(res.data);
    };
    const fetchFavorites = async () => {
      const res = await axios.get(
        "http://localhost:5267/api/book/userFavourite"
      );
      setFavBooks(res.data);

      console.log("favbooks", res.data);
    };
    fetch();
    fetchFavorites();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    console.log("Cart button clicked");
  };
  const handleFavoritesClick = async (e) => {
    if (selectedBook) {
      try {
        await axios
          .post("http://localhost:5267/api/book/addFavorite", selectedBook)
          .then(() => {
            setIsFav(true);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFavoritesRemove = async (e) => {
    if (selectedBook) {
      console.log(selectedBook);
      try {
        await axios
          .delete(
            `http://localhost:5267/api/book/removeFavorite/${selectedBook.id}`
          )
          .then(() => {});
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleRemoveItem = (index) => {
  //   const updatedCartItems = [...cartItems];
  //   updatedCartItems.splice(index, 1);
  //   setCartItems(updatedCartItems);
  // };

  // const handleProceedToCheckout = () => {
  //   console.log("Proceed to checkout clicked");
  // };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const findFav = (selectedBook) => {
    var fav = favBooks.find((book) => book.id === selectedBook.id);
    if (fav) setIsFav(true);
    setIsFav(false);
  };

  return (
    <div>
      {!selectedBook && (
        <>
          <div className="h1">
            <h1>
              <i>Book List</i>
            </h1>
          </div>
          <p>Welcome to the world's largest online library!</p>

          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input placeholder="Search" type="search" class="input" />
          </div>
        </>
      )}

      {selectedBook ? (
        <div className="mt-3">
          <div className="back-container">
            <button onClick={handleBackClick} className="back-button">
              <b>Go Back</b>
            </button>
          </div>
          <div className="book-details">
            <div className="book-info">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="book-image"
              />
              <div className="book-box">
                <h2 className="book-title">{selectedBook.title}</h2>
                <p className="book-author">By {selectedBook.author}</p>

                <p className="book-description">{selectedBook.description}</p>
                <h2 className="book-category">{selectedBook.category}</h2>
                <div className="book-rating">
                  <span className="rating-label">Rating:</span>
                  <span className="rating-value">{selectedBook.rating}</span>
                </div>
                <div className="book-buttons">
                  {!findFav(selectedBook) ? (
                    <button
                      className="favorites-button"
                      onClick={handleFavoritesClick}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      Favorite
                    </button>
                  ) : (
                    <button
                      className="favorites-button"
                      onClick={handleFavoritesRemove}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      Remove Favorite
                    </button>
                  )}
                  <button className="cart-button" onClick={handleCartClick}>
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                  {/* <ShoppingCart
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveItem}
                    onProceedToCheckout={handleProceedToCheckout}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="book-container">
          {books.map((book, index) => (
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
      <nav aria-label="Page navigation example">
        <ul class="pagination  justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookUserList;
