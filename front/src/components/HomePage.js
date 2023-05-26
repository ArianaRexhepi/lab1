import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import SearchBar from './SearchBar';

function HomePage() {
    const handleSearch = (searchTerm) => {
      console.log('Search term:', searchTerm);
      // Perform search logic here (e.g., make an API call)
    };
  
    return (
      <div>
        <br></br>
        <h1><b><span>MJ </span> Library</b></h1>
        <p>The world's largest online library!</p>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
  }
  
  export default HomePage;
  