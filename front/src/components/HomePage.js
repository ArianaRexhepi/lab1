import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import axios from "axios";

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
        Welcome to the world's largest online library!
      </p>
      <p>
        We hope you enjoy using this website to fulfill your requirements.{"\n"}
        Here are some of our <b>Bestselling Books </b>for this month.
      </p>

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
                  <h6>{book.title}</h6>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <br />
      <footer>
        <hr></hr>
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
