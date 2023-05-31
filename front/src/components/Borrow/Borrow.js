import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Borrow() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:5267/api/borrow');
      setBooks(res.data);
    };
    fetch();
  }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm('Are you sure you want to delete this book?');
//     if (confirmed) {
//       await axios.delete(`http://localhost:5267/api/book/${id}`);
//       setBooks(books.filter(book => book.Id !== id));
//     }
//   };

  return (
    <><h1>Borrow</h1><div className="card shadow mb-4">
    <div className="card-header py-3">
        <div className="float-right">
          <Link to="/createborrow"><button className='btn btn-primary' >Create new</button></Link>
        </div>
    </div>

    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>BookTitle</th>
                <th>Author</th>
                <th>Username</th>
                <th>MarrjaeLibrit</th>
                <th>KthyerjaeLibrit</th>
                <th>Veprime</th>
            </tr>
        </thead>
        <tbody>
            {books.map(book => (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.bookTitle}</td>
                    <td>{book.author}</td>
                    <td>{book.username}</td>
                    <td>{book.marrjaeLibrit}</td>
                    <td>{book.kthyerjaeLibrit}</td>
                    {/* <td>
                        <Link to="/editbook"><button className='btn btn-primary'>Edit</button></Link>
                        <button className='btn btn-danger' onClick={() => handleDelete(book.id)}>Delete</button>
                    </td> */}
                </tr>
            ))}
        </tbody>
    </table>
</div></>
  );
}

export default Borrow;
