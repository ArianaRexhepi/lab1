import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light light-blue-bg ">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <Link to="/">
                        <a className="nav-link" href="#">Home</a>
                    </Link>
                    <Link to="/books">
                        <a className="nav-link" href="#">Books</a>
                    </Link>
                    <Link to="/bestsellers">
                        <a className="nav-link" href="#">Bestsellers</a>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;