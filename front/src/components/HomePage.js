import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import SearchBar from './SearchBar';
import image1 from './images/image1.jpg';

function HomePage() {
  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
    // Perform search logic here (e.g., make an API call)
  };

  return (
    <div>
      <br></br>
      <h1>
        <b>
          <span>MJ </span> Library
        </b>
      </h1>
      <p>The world's largest online library!</p>
      <SearchBar onSearch={handleSearch} />

      <div className="flex-container">
        <div className="flex-item">
          <div className="box">
            <img
              src={image1}
              alt="Image 1"
              style={{ height: '300px', width: '300px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
