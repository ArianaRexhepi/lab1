import React, { useState } from "react";
import "./homepage.css";
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
      "A hilarious romantic comedy about two people with clashing personalities who find love in unexpected ways.",
    rating: 4.0,
  },
  {
    title: "Archer's Voice",
    author: "Mia Sheridan",
    image: image10,
    description:
      "An emotional love story about a woman who helps a man find his voice and heal from a tragic past.",
    rating: 4.7,
  },
  {
    title: "Terms and Conditions",
    author: "Lauren Asher",
    image: image11,
    description:
      "A thought-provoking novel exploring the consequences of modern technology and social media.",
    rating: 4.3,
  },
  {
    title: "Daisy Jones and the Six",
    author: "Taylor Jenkins Reid",
    image: image12,
    description:
      "An enthralling tale of a fictional rock band in the 1970s and the dynamics among its members.",
    rating: 4.6,
  },
  {
    title: "By a Thread",
    author: "Lucy Score",
    image: image13,
    description:
      "A steamy romance novel about two people brought together by unexpected circumstances.",
    rating: 4.1,
  },
  {
    title: "Love on the Brain",
    author: "Ali Hazelwood",
    image: image4,
    description: "A charming and heartwarming love story set in a small town.",
    rating: 4.4,
  },
  {
    title: "The things we leave unfinished",
    author: "Rebecca Yarros",
    image: image17,
    description:
      "A delightful beach read filled with romance, humor, and memorable characters.",
    rating: 4.6,
  },
  {
    title: "The Wicked King",
    author: "Holly Black",
    image: image14,
    description:
      "A captivating story set against the backdrop of a beautiful beach.",
    rating: 4.8,
  },
  {
    title: "A dance in the dark ",
    author: "Jhuly Oliveira",
    image: image15,
    description:
      "An uplifting summer read that will leave you longing for a beach vacation.",
    rating: 4.3,
  },
  {
    title: "The soulmate equation",
    author: "Christina Lauren",
    image: image16,
    description:
      "A light and breezy book perfect for reading by the beach or pool.",
    rating: 4.5,
  },
  {
    title: "Make it sweet",
    author: "Kristen Callihan",
    image: image18,
    description:
      "A light and breezy book perfect for reading by the beach or pool.",
    rating: 4.7,
  },
];

const BookUserList = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackClick = () => {
    setSelectedBook(null);
  };

  return (
    <div>
      <div className="h1">
        <h1>
          <i>Book List</i>
        </h1>
      </div>

      {selectedBook ? (
        <div>
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
              <div>
                <h2 className="book-title">{selectedBook.title}</h2>
                <p className="book-author">By {selectedBook.author}</p>
                <p className="book-description">{selectedBook.description}</p>
                <div className="book-rating">
                  <span className="rating-label">Rating:</span>
                  <span className="rating-value">{selectedBook.rating}</span>
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
