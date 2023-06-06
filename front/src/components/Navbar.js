import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/actions';

const Navbar = () => {
  // state eshte per me i marr te dhenat e userit
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  const findAdmin = () => {
    const isAdmin = state.user.roles.find((role) => role === "admin");

  }

  //me i pat te dhenat e userit
  console.log(state.user)

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
          {state.user === null && (
            <>
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
            </>
          )}
          {state.user !== null && (
            <li onClick={handleLogOut} className="nav-item" style={{cursor: 'pointer'}}>
                Log Out
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
