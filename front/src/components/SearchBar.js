import React, { useState } from 'react';
import './homepage.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        style={{ width: '650px', height: '40px' }} // Adjust width and height as desired
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
