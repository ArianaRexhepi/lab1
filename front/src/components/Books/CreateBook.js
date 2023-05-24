import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      Title: title,
      Author: author,
      Timestamp: timestamp
    };

    try {
      const response = await axios.post('http://localhost:5267/api/book', newBook);
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
            <h4 className="modal-title">Shto Libër</h4>
            <Link to="/books"><button type="button" className="close" data-dismiss="modal" aria-hidden="true" onclick="window.location='/books';">&times;</button></Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Titulli:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Autori</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Timestamp</label>
              <input type="datetime" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/books"><input type="button" className="btn btn-dark" value="Anulo" /></Link>
            <input type="submit" value="Create" className="btn btn-primary float-right" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
