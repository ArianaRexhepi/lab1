import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RecommendedList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:5267/api/recommended');
      setBooks(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      await axios.delete(`http://localhost:5267/api/recommended/${id}`).then(()=> {
        setBooks(books.filter(book => book.id !== id));
      });
    }
  };

  return (
    <><h1>Recommended</h1><div className="card shadow mb-4">
          <div className="card-header py-3">
              <div className="float-right">
              <Link to="/createrecommended"><button className='btn btn-primary' >Create new</button></Link>
              </div>
          </div>

          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Rating</th>
                      <th>Year</th>
                      <th>Image</th>
                      <th>Veprime</th>
                  </tr>
              </thead>
              <tbody>
                  {books.map(book => (
                      <tr key={book.id}>
                          <td>{book.id}</td>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.category}</td>
                          <td>{book.description}</td>
                          <td>{book.rating}</td>
                          <td>{book.year}</td>
                          <td> 
                            <img src={book.image} alt='' style={{width:"200px", height:"250px", objectFit:"cover"}}/>
                          </td>
                          <td>
                          <Link to={`/editrecommended/${book.id}`}><button className='btn btn-primary'>Edit</button></Link>
                              <button className='btn btn-danger' onClick={() => handleDelete(book.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div></>
  );
}

export default RecommendedList;
