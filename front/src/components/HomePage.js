import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import SearchBar from "./SearchBar";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpeg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpeg";
import image5 from "./images/image5.jpeg";
import image6 from "./images/image6.jpg";

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredImages = [image1, image2, image3, image4, image5, image6].filter((image) => {
    // Apply filter logic based on the filter values
    return (
      (filters.category === '' || getCategory(image) === filters.category) &&
      (filters.author === '' || getAuthor(image) === filters.author) &&
      (filters.rating === '' || getRating(image) === filters.rating)
    );
  });

  const applyFilters = () => {
    // Logic to apply the filters and update the search results
    // You can modify this based on your actual data and filtering requirements
    const filteredResults = []; // Filtered search results

    setSearchResults(filteredResults);
  };

  const getCategory = (image) => {
    // Return the category of the image based on your data or logic
    return 'fiction';
  };

  const getAuthor = (image) => {
    // Return the author of the image based on your data or logic
    return 'John Doe';
  };

  const getRating = (image) => {
    // Return the rating of the image based on your data or logic
    return '5';
  };

  return (
    <div>
      <br />
      <h1>
        <b>
          <span>Ari </span> Library
        </b>
      </h1>
      <p>The world's largest online library!</p>
      <br />
      <SearchBar onSearch={handleSearch} searchResults={searchResults} />
      <div className="flex-container">
        <div className="flex-item">
          <div className="box">
            <img
              src={image1}
              alt="Image 1"
              style={{ height: "250px", width: "200px" }}
            />
            <img
              src={image2}
              alt="Image 1"
              style={{ height: "250px", width: "200px" }}
            />
            <img
              src={image3}
              alt="Image 3"
              style={{ height: "250px", width: "200px" }}
            />
          </div>
          <div className="box">
            <img
              src={image4}
              alt="Image 4"
              style={{ height: "250px", width: "200px" }}
            />
            <img
              src={image5}
              alt="Image 5"
              style={{ height: "250px", width: "200px" }}
            />
            <img
              src={image6}
              alt="Image 6"
              style={{ height: "250px", width: "200px" }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="filters">
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
        <button className="filter-button" onClick={applyFilters}>
          Apply Filters
        </button>
        </div>
      <footer>
        <p>
          <i>
            @2023 by <span>MJ Library.</span> All Rights Reserved.
          </i>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
