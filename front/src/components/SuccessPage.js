// src/pages/SuccessPage.js
import React from "react";
import { useNavigate } from "react-router";

function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="container-modern text-center mt-5">
      <h1 className="text-gradient">Payment Successful!</h1>
      <p className="text-muted">Your order has been placed successfully.</p>
      <button className="btn-modern mt-3" onClick={() => navigate("/orderhistory")}>
        View Order History
      </button>
    </div>
  );
}

export default SuccessPage;
