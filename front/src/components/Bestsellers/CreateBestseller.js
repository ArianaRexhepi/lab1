import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateBestseller() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newBook = {
      Title: title,
      Author: author,
      Rating: rating,
      Year: year
    };

    try {
     await axios.post('http://localhost:5267/api/bestsellers', newBook).then(()=> {
      setLoading(false);
      navigate("/bestsellers");
     });
      console.log(newBook);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop:'50px' }}>
    <div className="modal-content">
      <form className="form">
        <div className="modal-header">
            <h4 className="modal-title">Add Bestseller</h4>
            <Link to="/bestsellers">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                onclick="window.location='/bestsellers';"
              >
                &times;
              </button>
            </Link>
          </div>
          <div className="modal-body" >
            <div className="form-group">
              <label>Titulli:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Autori:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="datetime"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
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
