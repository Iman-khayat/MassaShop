import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart/1') // استبدل بـ userId حقيقي
      .then(response => setCart(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <p>Product ID: {item.productId}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;

