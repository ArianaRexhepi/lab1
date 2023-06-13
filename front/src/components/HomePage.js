import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import axios from "axios";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpeg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpeg";
import image5 from "./images/image5.jpeg";
import image6 from "./images/image6.jpg";

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5267/api/bestsellers");
      setBooks(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <br />
      <h1>
        <b>
          <span>MJ </span> Library
        </b>
      </h1>
      <p>
        {" "}
        We believe that books have the power to inspire, educate, and entertain.{" "}
      </p>
      <br />
      <div className="flex-container">
        <div className="flex-item">
          <div className="box">
          {books.map((book) => (
            <>
            <div></div>
            <div>
              <img
              src={book.image}
              alt="Image 1"
              style={{ height: "250px", width: "200px" }}
            />
            <h6>{book.title}</h6></div>
            
            </>
          ))}
          </div>
        </div>
      </div>
      <br />
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
