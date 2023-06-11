import React from "react";
import "./homepage.css";

const ProfilePage = () => {
  // Define the user profile data
  const user = {
    name: "Ariana Rexhepi",
    email: "arianaarexhepi@gmail.com",
    cart: ["Book 1", "Book 2", "Book 3"],
    favorites: ["Book 4", "Book 5"],
  };

  return (
    <div className="profile-page">
      <h2>Welcome, {user.name}!</h2>

      <div className="profile-details">
        <h3>My Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      </div>
  );
};

export default ProfilePage;
