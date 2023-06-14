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
      const res = await axios.get(`http://localhost:5267/api/book/${id}`);
      setSelectedBook(res.data);
      console.log("selectedBook", res.data);
    };
    const fetchFavorites = async () => {
      await axios
        .get(`http://localhost:5267/api/book/userFavourite/${id}`)
        .then((res) => {
          if (res.data) {
            setFound(true);
          }
        });
    };
    const fetchCart = async () => {
      await axios.get(`http://localhost:5267/api/cart/${id}`).then((res) => {
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
        .post("http://localhost:5267/api/book/addFavorite", selectedBook)
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
            `http://localhost:5267/api/book/removeFavorite/${selectedBook.id}`
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
        .post("http://localhost:5267/api/cart", selectedBook)
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
          .delete(`http://localhost:5267/api/cart/${selectedBook.id}`)
          .then(() => {
            setCart(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!selectedBook || loading) return <div>Loading...</div>;

  return (
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
            <h4 className="book-category">{selectedBook.category}</h4>
            <div className="book-rating">
              <span className="rating-label">Rating:</span>
              <span className="rating-value">{selectedBook.rating}</span>
            </div>
            <div className="book-buttons">
              {!found ? (
                <button
                  className="favorites-button"
                  onClick={() => handleFavoritesClick(selectedBook)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  Favorite
                </button>
              ) : (
                <button
                  className="favorites-button"
                  onClick={() => handleFavoritesRemove()}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  Remove Favorite
                </button>
              )}
              {!cart ? (
                <button className="cart-button" onClick={handleCartClick}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Add to Cart
                </button>
              ) : (
                <button className="cart-button" onClick={handleCartRemove}>
                  <FontAwesomeIcon icon={faCartPlus} />
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
