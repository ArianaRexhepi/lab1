import React from 'react';
import './homepage.css';

const ProfilePage = () => {
  const user = {
    name: 'Ariana Rexhepi',
    email: 'arianaarexhepi@gmail.com',
    cart: ['Book 1', 'Book 2', 'Book 3'],
    favorites: ['Book 4', 'Book 5'],
  };

  
  const recommendedBooks = ['Book 6', 'Book 7', 'Book 8'];

  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}!</h2>

      <div className="profile-details">
        <h3>My Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <div className="edit-profile">
        <button>Edit Profile</button>
      </div>

      <div className="my-cart">
        <h3>My Cart</h3>
        {user.cart.length > 0 ? (
          <ul>
            {user.cart.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="my-favorites">
        <h3>My Favorites</h3>
        {user.favorites.length > 0 ? (
          <ul>
            {user.favorites.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>You haven't added any favorites yet.</p>
        )}
      </div>

      <div className="recommended-books">
        <h3>Recommended Books</h3>
        {recommendedBooks.length > 0 ? (
          <ul>
            {recommendedBooks.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        ) : (
          <p>No recommended books available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
