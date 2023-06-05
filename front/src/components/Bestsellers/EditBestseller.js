import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBestseller() {
  const [loading, setLoading] = useState(false);
  const [bestseller, setBestseller] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5267/api/bestsellers/${id}`)
      .then((response) => {
        setBestseller(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(`http://localhost:5267/api/bestsellers/${id}`, bestseller)
        .then(() => {
          setLoading(false);
          navigate("/bestsellers");
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (bestseller === null) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop:'50px' }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Book</h4>
            <Link to="/bestsellers">
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
                value={bestseller.title}
                onChange={(e) =>
                  setBestseller({ ...bestseller, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={bestseller.author}
                onChange={(e) =>
                  setBestseller({ ...bestseller, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label> Description:</label>
              <input
                type="text"
                className="form-control"
                value={bestseller.description}
                onChange={(e) =>
                  setBestseller({ ...bestseller, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={bestseller.year}
                onChange={(e) =>
                  setBestseller({ ...bestseller, year: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="text"
                className="form-control"
                value={bestseller.rating}
                onChange={(e) =>
                  setBestseller({ ...bestseller, rating: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={bestseller.image}
                onChange={(e) =>
                  setBestseller({ ...bestseller, image: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/bestsellers">
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

export default EditBestseller;
