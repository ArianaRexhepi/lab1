import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateRecommended() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState(new Date());
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newBook = {
      Title: title,
      Author: author,
      Category:category,
      Description: description,
      Rating: rating,
      Year: year,
      Image: image
    };

    try {
      await axios
        .post("http://localhost:5267/api/recommended", newBook)
        .then(() => {
          setLoading(false);
          navigate("/recommended");
        });
      console.log(newBook);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="modal-header">
            <h4 className="modal-title">Add Recommended Book</h4>
            <Link to="/recommended">
            <button type="button" className="btn-close" aria-label="Close"></button>
            </Link>
          </div>
          <div className="modal-body">
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
              <label>Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                type="datetime"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
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
            <Link to="/recommended">
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

export default CreateRecommended;
