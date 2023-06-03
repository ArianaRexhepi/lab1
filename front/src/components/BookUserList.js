import React from 'react';
import './homepage.css';
import image1 from './images/image1.jpg';
import image4 from './images/image4.jpeg';
import image7 from './images/image7.jpg';
import image8 from './images/image8.jpg';
import image9 from './images/image9.jpeg';
import image10 from './images/image10.jpeg';
import image11 from './images/image11.jpeg';

const books = [
  {
    title: 'The Fault in our stars',
    author: 'John Green',
    image: image1,
  },
  {
    title: 'Things we never got over',
    author: 'Lucy Sore',
    image: image7,
  },
  {
    title: 'Cheat Sheet',
    author: 'Sarah Adams',
    image: image8,
    
  },
  {
    title: 'Act your age',
    author: 'Eve Brown',
    image: image9,
    
  },
  {
    title: 'Archers Voice',
    author: 'Mia Sheridan',
    image: image10,
    
  },
  {
    title: 'Terms and Conditions',
    author: 'Lauren Asher',
    image: image11,
    
  },
  {
    title: 'Daisy Jones and the Six',
    author: 'Taylor Jenkins Reid',
    image: 'book7.jpg',
    
  },
  {
    title: 'By a Thread',
    image: 'book8.jpg',
    
  },
  {
    title: 'Love on the brain',
    image: image4,
    
  },
  {
    title: 'Beach Read',
    author: '',
    image: 'book10.jpg',
    
  },
  {
    title: 'Beach Read',
    image: 'image4',
    
  },
  {
    title: 'Beach Read',
    image: 'image4',
    
  },
  {
    title: 'Beach Read',
    image: '',
    
  },
  
  
];

const BookUserList = () => {
  return (
    <div>
        <div className='h1'>
      <h1>Book List</h1>
      </div>
      <div className="book-container">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3><b>{book.title}</b></h3>
            <p><i>Author: {book.author}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookUserList;
