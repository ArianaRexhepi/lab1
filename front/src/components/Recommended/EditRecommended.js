import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditRecommended() {
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5267/api/recommended/${id}`)
      .then((response) => {
        setRecommended(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(`http://localhost:5267/api/recommended/${id}`, recommended)
        .then(() => {
          setLoading(false);
          navigate("/recommended");
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (recommended === null) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop:'50px' }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Book</h4>
            <Link to="/recommended">
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
                value={recommended.title}
                onChange={(e) =>
                  setRecommended({ ...recommended, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={recommended.author}
                onChange={(e) =>
                    setRecommended({ ...recommended, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label> Description:</label>
              <input
                type="text"
                className="form-control"
                value={recommended.description}
                onChange={(e) =>
                    setRecommended({ ...recommended, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={recommended.year}
                onChange={(e) =>
                    setRecommended({ ...recommended, year: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="text"
                className="form-control"
                value={recommended.rating}
                onChange={(e) =>
                    setRecommended({ ...recommended, rating: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={recommended.image}
                onChange={(e) =>
                    setRecommended({ ...recommended, image: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/recommended">
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

export default EditRecommended;
