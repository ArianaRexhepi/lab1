import React, { useState } from 'react';
import axios from 'axios';

function CreateBestseller() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      Title: title,
      Author: author,
      Rating: rating,
      Year: year
    };

    try {
      const response = await axios.post('http://localhost:5267/api/bestsellers', newBook);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <br />
      <label>
        Rating:
        <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
      </label>
      <br />
      <label>
        Year:
        <input type="datetime" value={year} onChange={(e) => setYear(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateBestseller;
