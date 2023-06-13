import { Route, Routes } from "react-router";
import BookList from "./Books/BookList";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import React from "react";
import CreateBook from "./Books/CreateBook";
import BestsellerList from "./Bestsellers/BestsellerList";
import CreateBestseller from "./Bestsellers/CreateBestseller";
import EditBook from "./Books/EditBook";
import LoginForm from "./LoginForm";
import Borrow from "./Borrow/Borrow";
import CreateBorrow from "./Borrow/CreateBorrow";
import EditBestseller from "./Bestsellers/EditBestseller";
import EditBorrow from "./Borrow/EditBorrow";
import BookUserList from "./BookUserList";
import RegisterForm from "./RegisterForm";
import ProfilePage from "./ProfilePage";
import ShoppingCart from "./ShoppingCart";
import Recbooks from "./Recbooks";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import RecommendedList from "./Recommended/RecommendedList";
import EditRecommended from "./Recommended/EditRecommended";
import CreateRecommended from "./Recommended/CreateRecommended";

const Pages = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<AdminProtectedRoute redirectPath="/" />}>
          <Route path="/bestsellers" element={<BestsellerList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/createbestseller" element={<CreateBestseller />} />
          <Route path="/editbestseller/:id" element={<EditBestseller />} />
          <Route path="/editbook/:id" element={<EditBook />} />
          <Route path="/recommended" element={<RecommendedList />} />
          <Route path="/editrecommended/:id" element={<EditRecommended/>} />
          <Route path="/createrecommended" element={<CreateRecommended />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/createborrow" element={<CreateBorrow />} />
          <Route path="/editborrow/:id" element={<EditBorrow />} />
        </Route>
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoute redirectPath="/" />}>
          <Route path="/myprofile" element={<ProfilePage />} />
          <Route path="/bookuserlist" element={<BookUserList />} />
          <Route path="/mycart" element={<ShoppingCart />} />
          <Route path="/recbooks" element={<Recbooks />} />
        </Route>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
};

export default Pages;
