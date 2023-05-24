import logo from './logo.svg';
import './App.css';
import Pages from './components/Pages'
import BookList from './components/Books/BookList';
import React from 'react';
import BestsellerList from './components/Bestsellers/BestsellerList'

function App() {
  return (
    <div className="App">
      <Pages/>
    </div>
  );
}

export default App;
