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
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        style={{ width: '750px', height: '40px' }}
      />
      <button type="submit" style={{ backgroundColor: 'blue', color: 'white', border: '2px solid white', width: '100px', height: '40px' }}>Search</button>
    </form>
  );
};

export default SearchBar;
