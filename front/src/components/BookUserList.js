import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "./ShoppingCart";
import image1 from "./images/image1.jpg";
import image4 from "./images/image4.jpeg";
import image7 from "./images/image7.jpg";
import image8 from "./images/image8.jpg";
import image9 from "./images/image9.jpeg";
import image10 from "./images/image10.jpeg";
import image11 from "./images/image11.jpeg";
import image12 from "./images/image12.jpg";
import image13 from "./images/image13.jpeg";
import image14 from "./images/image14.jpg";
import image15 from "./images/image15.jpg";
import image16 from "./images/image16.jpg";
import image17 from "./images/image17.jpg";
import image18 from "./images/image18.jpg";

const books = [
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    image: image1,
    description:
      "The Fault in Our Stars is a novel about two teenagers, Hazel and Augustus, who meet at a cancer support group and fall in love. They navigate the challenges of illness and mortality while exploring the meaning of life and the power of love. It is a poignant and heartfelt story that delves into the complexities of living with cancer and the pursuit of happiness in the face of adversity.",
    category: "Romance",
    rating: 4.5,
  },
  {
    title: "Things We Never Got Over",
    author: "Lucy Sore",
    image: image7,
    description:
      "There’s a reason Knox doesn’t do complications or high-maintenance women, especiallynot the romantic ones. But since Naomi’s life imploded right in front of him, the least he can do is help her out of her jam. And just as soon as she stops getting into new trouble he can leave her alone and get back to his peaceful, solitary life. At least, that’s the plan until the trouble turns to real danger.",
    rating: 3.8,
  },
  {
    title: "Cheat Sheet",
    author: "Sarah Adams",
    image: image8,
    description:
      "After a car accident ended her chance at becoming a professional ballerina, Bree changed paths and now owns her own dance studio, with big dreams to expand it. But one more rent increase could mean the end of the studio entirely. Then, as usual, Nathan comes to the rescue and buys the entire building",
    rating: 4.2,
  },
  {
    title: "Act Your Age",
    author: "Eve Brown",
    image: image9,
    description:
      "Act Your Age is a romantic comedy novel written by Eve Brown. The story follows the life of Jacob Wayne, a grumpy and uptight hotel manager who prides himself on order and control. When a free-spirited and colorful woman named Eve Brown accidentally hits Jacob with her car, it leads to unexpected consequences. To make amends, Eve offers to work at Jacob's hotel temporarily.",
    rating: 4.0,
  },
  {
    title: "Archer's Voice",
    author: "Mia Sheridan",
    image: image10,
    description:
      "Archer's Voice is a contemporary romance novel written by Mia Sheridan. The story revolves around a young woman named Bree Prescott who moves to the small town of Pelion, Maine, seeking solace and a fresh start. There, she encounters Archer Hale, a mysterious and reclusive man with a tragic past.",
    rating: 4.7,
  },
  {
    title: "Terms and Conditions",
    author: "Lauren Asher",
    image: image11,
    description:
      "Declan Kane, the eldest of the Kane siblings has always known that he would be the CEO of his family's media empire. But his grandfather's will stipulation requires him to be married with an heir to be eligible to be the CEO leaves Declan reeling.",
    rating: 4.3,
  },
  {
    title: "Daisy Jones and the Six",
    author: "Taylor Jenkins Reid",
    image: image12,
    description:
      "Daisy Jones & The Six by Taylor Jenkins Reid is a captivating novel set in the music industry of the 1970s. The story unfolds through a series of interviews, chronicling the rise and fall of a fictional rock band called The Six and their enigmatic lead singer, Daisy Jones.The book takes readers on a nostalgic journey as it explores the complexities of fame, love, and artistic collaboration.",
    rating: 4.6,
  },
  {
    title: "By a Thread",
    author: "Lucy Score",
    image: image13,
    description:
      "By a Thread by Lucy Score is a contemporary romance novel that follows the story of Dominic Andrews, a dedicated single father and successful businessman, and Lily Spencer, a strong-willed and independent woman with a troubled past.The book explores themes of love, family, and second chances. It delves into the complexities of overcoming past traumas and learning to trust and open oneself up to love again. ",
    rating: 4.1,
  },
  {
    title: "Love on the Brain",
    author: "Ali Hazelwood",
    image: image4,
    description:
      " Love on the Brain is a romance novel by Italian author Ali Hazelwood and follows the story of a neuroscientist, Dr. Bee Königswasser, who embarks on a career-high assignment of co-leading a project at NASA but has to contend with working alongside her old grad school nemesis, Levi Ward.",
    rating: 4.4,
  },
  {
    title: "The things we leave unfinished",
    author: "Rebecca Yarros",
    image: image17,
    description:
      "The Things We Leave Unfinished by Rebecca Yarros is a captivating contemporary romance novel. The story follows Emerson Montgomery, a successful and independent woman who unexpectedly inherits an unfinished manuscript from her favorite author, J.L. Sterling.",
    rating: 4.6,
  },
  {
    title: "The Wicked King",
    author: "Holly Black",
    image: image14,
    description:
      "The Wicked King by Holly Black is the second book in the fantasy series titled The Folk of the Air. The story continues to follow Jude Duarte, a mortal girl who finds herself immersed in the dangerous and treacherous world of Faerie. The book explores themes of power, ambition, and the lengths one will go to protect what they love. ",
    rating: 4.8,
  },
  {
    title: "A dance in the dark ",
    author: "Jhuly Oliveira",
    image: image15,
    description:
      "In this journey, Rosélina Johnson will have to learn how to deal with her new life as a hunted woman, her own powerful magic, the truth it was taken, and her own mind trying to trick her. Sometimes you need to learn to befriend the dragon and kill the king. And deal with a hot, tattooed, sarcastic, dark-haired man. Would she find the strength? And where? How? With whom?",
    rating: 4.3,
  },
  {
    title: "The soulmate equation",
    author: "Christina Lauren",
    image: image16,
    description:
      "The Soulmate Equation by Christina Lauren is a contemporary romance novel with a touch of science fiction. The story follows the life of Jess Davis, a single mom and statistics genius. When she hears about a new matchmaking service called GeneticAlly that claims to predict people's soulmate potential based on their DNA, she decides to give it a try.",
    rating: 4.5,
  },
  {
    title: "Make it sweet",
    author: "Kristen Callihan",
    image: image18,
    description:
      "Make It Sweet by Kristen Callihan is a contemporary romance novel that serves up a delightful blend of sweet and spicy. The story revolves around the lives of Emma Maroni, a talented pastry chef, and Lucian Lucky Osmond, a brooding and famous ex-rock star. Is a heartwarming and steamy love story that explores themes of self-discovery, second chances, and finding happiness in unexpected places. ",
    rating: 4.7,
  },
];

const BookUserList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    author: "",
    rating: "",
  });

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredImages = [
    image1,
    image12,
    image13,
    image4,
    image15,
    image16,
  ].filter((image) => {
    // Apply filter logic based on the filter values
    return (
      (filters.category === "" || getCategory(image) === filters.category) &&
      (filters.author === "" || getAuthor(image) === filters.author) &&
      (filters.rating === "" || getRating(image) === filters.rating)
    );
  });

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
          {/* <div className="filters">
            <label>
              Category:
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
            </label>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Rating:
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
              </select>
            </label>
            <button className="apply-button" onClick={applyFilters}>
              Apply Filters
            </button>
          </div> */}
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
