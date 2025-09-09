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
  faReceipt,
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
    <header className="header-modern">
      <nav className="navbar-modern">
        <Link to="/" className="navbar-brand-modern">
          BookStore
        </Link>
        
        <ul className="navbar-nav-modern">
          <li>
            <Link to="/" className="nav-link-modern">
              Home
            </Link>
          </li>
          
          {state.user && (
            <>
              <li>
                <Link to="/bookuserlist" className="nav-link-modern">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/recbooks" className="nav-link-modern">
                  Recommended
                </Link>
              </li>
            </>
          )}
          
          {isAdmin && (
            <li className="dropdown">
              <a
                className="nav-link-modern dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               Dashboard
              </a>
              <ul className="dropdown-menu" style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--gray-200)',
                padding: '0.5rem 0',
                minWidth: '200px'
              }}>
                <li>
                  <Link to="/books" className="dropdown-item" style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                  Books List
                  </Link>
                </li>
                <li>
                  <Link to="/bestsellers" className="dropdown-item" style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                  Bestsellers
                  </Link>
                </li>
                <li>
                  <Link to="/recommended" className="dropdown-item" style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                  Recommended
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="dropdown-item" style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    background: 'var(--gray-50)',
                    transition: 'all var(--transition-fast)'
                  }}>
                  Admin Panel
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {state.user === null && (
            <li>
              <Link to="/login" className="btn-modern">
              Sign In
              </Link>
            </li>
          )}
          
          {state.user && (
            <li className="dropdown">
              <a
                className="nav-link-modern dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  {state.user.username.charAt(0).toUpperCase()}
                </div>
                {state.user.username}
              </a>
              <ul className="dropdown-menu" style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--gray-200)',
                padding: '0.5rem 0',
                minWidth: '220px'
              }}>
                <li>
                  <Link to="/myprofile" className="dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <FontAwesomeIcon icon={faUser} />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/myfavorites" className="dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <FontAwesomeIcon icon={faHeart} />
                    My Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/mycart" className="dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    My Cart
                  </Link>
                </li>
                <li>
                  <Link to="/orderhistory" className="dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <FontAwesomeIcon icon={faReceipt} />
                    Order History
                  </Link>
                </li>
                <li style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}>
                  <button
                    onClick={handleLogOut}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0.75rem 1rem',
                      color: 'var(--danger-color)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'var(--gray-50)'}
                    onMouseOut={(e) => e.target.style.background = 'none'}
                  >
                  Log Out
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
