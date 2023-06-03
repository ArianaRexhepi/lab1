import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBorrow() {
  const [loading, setLoading] = useState(false);
  const [borrow, setBorrow] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5267/api/borrow/${id}`)
      .then((response) => {
        setBorrow(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios
        .put(`http://localhost:5267/api/borrow/${id}`, borrow)
        .then(() => {
          setLoading(false);
          navigate("/borrow");
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (borrow === null) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop:'50px' }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Book</h4>
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
              <label>Titulli:</label>
              <input
                type="text"
                className="form-control"
                value={borrow.bookTitle}
                onChange={(e) =>
                  setBorrow({ ...borrow, bookTitle: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Autori:</label>
              <input
                type="text"
                className="form-control"
                value={borrow.author}
                onChange={(e) =>
                  setBorrow({ ...borrow, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                value={borrow.username}
                onChange={(e) =>
                  setBorrow({ ...borrow, username: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>MarrjaeLibrit:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={borrow.marrjaeLibrit}
                onChange={(e) =>
                  setBorrow({ ...borrow, marrjaeLibrit: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>KthyerjaeLibrit:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={borrow.kthyerjaeLibrit}
                onChange={(e) =>
                  setBorrow({ ...borrow, kthyerjaeLibrit: e.target.value })
                }
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/borrow">
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

export default EditBorrow;
