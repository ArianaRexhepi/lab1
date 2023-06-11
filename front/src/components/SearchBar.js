import React, { useState } from 'react';
import './homepage.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // ("http://localhost:5267/api/bookuserlist")
      const results = await fetchBookDetails(searchTerm);
      setSearchResults(results);
      setSearchTerm('');
    } catch (error) {
      console.error(error);
      // Handle the error scenario
    }
  };

  const fetchBookDetails = async (searchTerm) => {
    // Implement the logic to fetch book details based on the search term
    // You can make an API call here or access the book data from a database
    // Return the search results as an array of book objects
    // Each book object should contain the necessary details such as title, author, description, etc.
    // Example:
    const response = await fetch(`http://localhost:5267/api/searchbar?query=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Error occurred while searching.'); // Handle error scenario
    }
    const data = await response.json();
    return data.results; // Assuming the response data contains the book results
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          style={{ width: '750px', height: '40px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: '2px solid white',
            width: '100px',
            height: '40px',
          }}
        >
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <div>
                  <h4>{result.title}</h4>
                  <p>{result.author}</p>
                  <p>{result.description}</p>
                  {/* Display additional book details as needed */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
