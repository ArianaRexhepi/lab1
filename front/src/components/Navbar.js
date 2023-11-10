import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                  <li className="nav-link">
                    <Link to="/books" className="dropdown-item">
                      BooksList
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/bestsellers" className="dropdown-item">
                      BestsellersList
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/recommended" className="dropdown-item">
                      RecommendedList
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/personi" className="dropdown-item">
                      PersoniList
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/banka" className="dropdown-item">
                      BankaList
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          {state.user === null && (
            <>
             
                <li className="nav-item ms-auto">
                  <Link to="/login" className="nav-link">
                    <button className="buttonn">
                      Sign in
                      <div className="arrow-wrapper">
                        <div className="arrow"></div>
                      </div>
                    </button>
                  </Link>
                </li>

            </>
          )}
          {state.user && (
            <>
              <li className="nav-item dropdown ms-auto">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.user.username}
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-link">
                    <Link to="/myprofile" className="nav-link">
                      <FontAwesomeIcon icon={faUser} />
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/myfavorites" className="nav-link">
                      <FontAwesomeIcon icon={faHeart} />
                      My Favorites
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/mycart" className="nav-link">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      My Cart
                    </Link>
                  </li>
                  <li
                    className="nav-link"
                    onClick={handleLogOut}
                    style={{ cursor: "pointer", backgroundColor: "purple" }}
                  >
                    <button className="buttonn">
                      Log out
                      <div className="arrow-wrapper">
                        <div className="arrow"></div>
                      </div>
                    </button>
                  </li>
                </ul>
              </li>
            </>
            // <>
            //   <ul className="navbar-nav">
            //     <ul className="nav">
            //       <li className="nav-item">

            //       </li>
            //       <li className="nav-item">

            //       </li>
            //       <li className="nav-item">

            //       </li>

            //       <li

            //         className="nav-item"

            //       >

            //       </li>
            //     </ul>
            //   </ul>
            // </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
