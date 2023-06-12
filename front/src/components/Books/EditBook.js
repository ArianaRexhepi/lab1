import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5267/api/book/${id}`).then((response) => {
      setBook(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5267/api/book/${id}`, book).then(() => {
        setLoading(false);
        navigate("/books");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if(!book) return <div>Loading...</div>

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
          <form className="form">
            <div className="modal-header">
              <h4 className="modal-title">Edit Book</h4>
              <Link to="/books">
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
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.title}
                  onChange={(e) =>
                    setBook({ ...book, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Author:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.author}
                  onChange={(e) =>
                    setBook({ ...book, author: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.category}
                  onChange={(e) =>
                    setBook({ ...book, category: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.description}
                  onChange={(e) =>
                    setBook({ ...book, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Rating:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.rating}
                  onChange={(e) =>
                    setBook({...book, rating: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Year:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={book.year}
                  onChange={(e) =>
                    setBook({ ...book, year: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.image}
                  onChange={(e) =>
                    setBook({ ...book, image: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={book.price}
                  onChange={(e) =>
                    setBook({ ...book, price: e.target.value })
                  }
                />
              </div>
            </div>
  
            <div className="modal-footer">
              <Link to="/books">
                <input type="button" className="btn btn-dark" value="Dismiss" />
              </Link>
              <input
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                value="Edit"
                className="btn btn-primary float-right"
              />
            </div>
          </form>
        </div>
    </div>
  );
}

export default EditBook;
