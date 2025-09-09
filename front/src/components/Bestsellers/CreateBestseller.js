import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateBestseller() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState(new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }
    if (!author.trim()) {
      setError("Author is required");
      setLoading(false);
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      setLoading(false);
      return;
    }

    const newBook = {
      Title: title.trim(),
      Author: author.trim(),
      Rating: rating.toString(),
      Year: new Date(year),
      Image: image.trim() || "https://via.placeholder.com/300x400/6366f1/ffffff?text=Book+Cover",
    };

    try {
      await axios.post("http://localhost:5267/api/bestsellers", newBook);
      setLoading(false);
      navigate("/bestsellers");
    } catch (error) {
      console.error(error);
      setError("Failed to create bestseller. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="modal-header">
            <h4 className="modal-title">Add Bestseller</h4>
            <Link to="/bestsellers">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
                placeholder="Enter rating (1-5)"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/bestsellers">
              <input type="button" className="btn btn-danger" value="Dismiss" />
            </Link>
            <input
              type="submit"
              value="Create"
              disabled={loading}
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBestseller;
