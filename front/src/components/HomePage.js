import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css';
import SearchBar from './SearchBar';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpeg';
import image5 from './images/image5.jpeg';
import image6 from './images/image6.jpg';

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
      <br></br>
      <SearchBar onSearch={handleSearch} />

      <div className="flex-container">
        <div className="flex-item">
          <div className="box">
            <img
              src={image1}
              alt="Image 1"
              style={{ height: '250px', width: '200px' }} 
              />
            <img
              src={image2}
              alt="Image 1"
              style={{ height: '250px', width: '200px' }} 
              />
            <img
              src={image3}
              alt="Image 3"
              style={{ height: '250px', width: '200px' }} 
              />
        </div>
        <div className="box">
        <img
              src={image4}
              alt="Image 4"
              style={{ height: '250px', width: '200px' }} 
              />
              <img
              src={image5}
              alt="Image 5"
              style={{ height: '250px', width: '200px' }} 
              />
              <img
              src={image6}
              alt="Image 6"
              style={{ height: '250px', width: '200px' }} 
              />
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default HomePage;
