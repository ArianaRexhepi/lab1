import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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

  let isAdmin = false;
  if (state.user) {
    const role = state.user.userRoles.find((role) => role === "Admin");
    if (role) {
      isAdmin = true;
    }
  }

  //me i pat te dhenat e userit
  console.log(state.user);

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
            <Link to="/recbooks" className="nav-link">
              Recommended 
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bsbooks" className="nav-link">
              Bestsellers 
            </Link>
          </li>
          {isAdmin && (
            <>
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
            </>
          )}
          
          
          {state.user === null && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                <button>Log in</button> 
                </Link>
              </li>
              {/* <li>
                <Link to="/register" className="nav-link">
                  Sign up
                </Link>
              </li> */}
              
            </>
          )}
          {state.user !== null && (
            <>
            <ul className="navbar-nav">
              <ul className="nav">
            <li className="nav-item">
              <Link to="/myprofile" className="nav-link">
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mycart" className="nav-link">
                <FontAwesomeIcon icon={faShoppingCart} />
                My Cart
              </Link>
            </li>
            <li
              onClick={handleLogOut}
              className="nav-item"
              style={{ cursor: "pointer" }}
            >
              <button>Log Out</button>
            </li>
          </ul>
          </ul>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
