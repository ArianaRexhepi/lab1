import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateBorrow() {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [username, setUsername] = useState('');
  const [marrjaeLibrit, setMarrjaeLibrit] = useState('');
  const [kthyerjaeLibrit, setKthyerjaeLibrit] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      BookTitle: bookTitle,
      Author: author,
      Username: username,
      MarrjaeLibrit: marrjaeLibrit,
      KthyerjaeLibrit: kthyerjaeLibrit
    };

    try {
      const response = await axios.post('http://localhost:5267/api/borrow', newBook);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-dialog" style={{ width: 600}}>
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Huazo Liber</h4>
            <Link to="/borrow"><button type="button" className="close" data-dismiss="modal" aria-hidden="true" onclick="window.location='/borrow';">&times;</button></Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>BookTitle:</label>
              <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>MarrjaeLibrit</label>
              <input type="datetime" value={marrjaeLibrit} onChange={(e) => setMarrjaeLibrit(e.target.value)} />
            </div>
            <div className="form-group">
              <label>KthyerjaeLibrit</label>
              <input type="datetime" value={kthyerjaeLibrit} onChange={(e) => setKthyerjaeLibrit(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/borrow"><input type="button" className="btn btn-danger" value="Dismiss" /></Link>
            <input type="submit" value="Create" className="btn btn-primary float-right" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBorrow;
