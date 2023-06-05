import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateBorrow() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [marrjaeLibrit, setMarrjaeLibrit] = useState(null);
  const [kthyerjaeLibrit, setKthyerjaeLibrit] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newBook = {
      BookTitle: bookTitle,
      Author: author,
      Email: email,
      MarrjaeLibrit: marrjaeLibrit,
      KthyerjaeLibrit: kthyerjaeLibrit,
    };

    try {
      await axios.post("http://localhost:5267/api/borrow", newBook).then(() => {
        setLoading(false);
        navigate("/borrow");
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
            <h4 className="modal-title">Borrowed Book</h4>
            <Link to="/borrow">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>BookTitle:</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
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
              <label>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>MarrjaeLibrit:</label>
              <input
                type="datetime-local"
                value={marrjaeLibrit}
                onChange={(e) => setMarrjaeLibrit(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>KthyerjaeLibrit:</label>
              <input
                type="datetime-local"
                value={kthyerjaeLibrit}
                onChange={(e) => setKthyerjaeLibrit(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/borrow">
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

export default CreateBorrow;
