import { Route, Routes } from "react-router";
import BookList from "./Books/BookList";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import React from "react";
import CreateBook from "./Books/CreateBook";
import BestsellerList from "./Bestsellers/BestsellerList";
import CreateBestseller from "./Bestsellers/CreateBestseller";
import EditBook from "./Books/EditBook";
import About from "./About";
import LoginForm from "./LoginForm";
import Borrow from "./Borrow/Borrow";
import CreateBorrow from "./Borrow/CreateBorrow";
import EditBestseller from "./Bestsellers/EditBestseller";
import EditBorrow from "./Borrow/EditBorrow";
import BookUserList from "./BookUserList";

const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/bookuserlist" element={<BookUserList />} />
        <Route path="/bestsellers" element={<BestsellerList />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/createborrow" element={<CreateBorrow />} />
        <Route path="/editborrow/:id" element={<EditBorrow />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="/createbestseller" element={<CreateBestseller />} />
        <Route path="/editbestseller/:id" element={<EditBestseller />} />
        <Route path="/editbook" element={<EditBook />} />
      </Routes>
    </>
  );
};

export default Pages;
