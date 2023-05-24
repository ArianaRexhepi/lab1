import { Route, Routes } from "react-router";
import BookList from "./Books/BookList";
import Navbar from "./Navbar"
import HomePage from "./HomePage";
import React from 'react';
import CreateBook from "./Books/CreateBook";
import BestsellerList from "./Bestsellers/BestsellerList";
import CreateBestseller from "./Bestsellers/CreateBestseller";
import EditBook from "./Books/EditBook";

const Pages = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/bestsellers" element={<BestsellerList />} />
                <Route path="/createbook" element={<CreateBook />} />
                <Route path="/createbestseller" element={<CreateBestseller />} />
                <Route path="/editbook" element={<EditBook />} />
            </Routes>
        </>
    )
}

export default Pages;