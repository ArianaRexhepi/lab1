import React from "react";
import './homepage.css';

const ShoppingCart = ({ cartItems, onRemoveItem, onProceedToCheckout }) => {
  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <span>Total:</span>
            <span>${calculateTotal(cartItems)}</span>
          </div>
          <button onClick={onProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

