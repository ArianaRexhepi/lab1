import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './homepage.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light light-blue-bg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bookuserlist" className="nav-link">
              Book List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bestsellers" className="nav-link">
              Bestsellers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/borrow" className="nav-link">
              Borrow
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/login" className="nav-link">
              Log in
            </Link>
            </li>
            <li>
            <Link to="/register" className="nav-link">
              Sign up
            </Link>
          </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
