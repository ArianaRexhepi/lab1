import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";

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
          {state.user && (
            <>
              <li className="nav-item">
                <Link to="/bookuserlist" className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recbooks" className="nav-link">
                  Recommended
                </Link>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item">
                      <Link to="/books" className="nav-link">
                        BooksList
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <Link to="/bestsellers" className="nav-link">
                        BestsellersList
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <Link to="/recommended" className="nav-link">
                        Recommended
                      </Link>
                    </a>
                  </li>
                </ul>
              </li>
            </>
          )}

          {state.user === null && (
            <>
              <ul className="login">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button>Log in</button>
                  </Link>
                </li>
              </ul>
            </>
          )}
          {!isAdmin && state.user && (
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
                  <li className="nav-item">
                    <Link to="/myfavorites" className="nav-link">
                      <FontAwesomeIcon icon={faHeart} />
                      My Favorites
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
          {isAdmin && state.user && (
            <ul className="navbar-nav">
              <li
                onClick={handleLogOut}
                className="nav-item"
                style={{ cursor: "pointer" }}
              >
                <button>Log Out</button>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
