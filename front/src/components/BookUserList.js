import React, { useEffect, useState } from "react";
import axios from 'axios';
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
  const [book,setBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:5267/api/book');
      setBooks(res.data);
      console.log(res.data);
    };
    fetch();
  }, []);


  const handleSearchBook = event => {
    setSearchTerm(event.target.value);
  };

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
  const handleFavoritesClick = (e) => {
    e.stopPropagation();
    console.log("Favorites button clicked");

    if (selectedBook) {
      const isFavorite = favorites.some(
        (book) => book.title === selectedBook.title
      );

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (book) => book.title !== selectedBook.title
        );
        setFavorites(updatedFavorites);
      } else {
        setFavorites([...favorites, selectedBook]);
      }
    }

    localStorage.setItem("favoriteBook", JSON.stringify(selectedBook));
    // navigate("/myprofile");
  };

  // const handleRemoveItem = (index) => {
  //   const updatedCartItems = [...cartItems];
  //   updatedCartItems.splice(index, 1);
  //   setCartItems(updatedCartItems);
  // };

  // const handleProceedToCheckout = () => {
  //   console.log("Proceed to checkout clicked");
  // };

  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: value,
  //   }));
  // };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  

  const applyFilters = () => {
    // Logic to apply the filters and update the search results
    // You can modify this based on your actual data and filtering requirements
    const filteredResults = []; // Filtered search results

    // Apply the category filter
    const filteredByCategory = searchResults.filter((result) =>
      result.category.includes(filters.category)
    );

    // Apply the author filter
    const filteredByAuthor = filteredByCategory.filter((result) =>
      result.author.includes(filters.author)
    );

    // Apply the rating filter
    const filteredByRating = filteredByAuthor.filter(
      (result) => result.rating === filters.rating
    );

    setSearchResults(filteredByRating);
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
                  <button
                    className="favorites-button"
                    onClick={handleFavoritesClick}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Favorite
                  </button>

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
    </div>
  );
};

export default BookUserList;
