import React, { useState } from 'react';
import axios from 'axios';

function CheckoutPage() {
  const [formData, setFormData] = useState({ name: '', address: '', paymentMethod: 'Credit Card' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/orders/create', {
      userId: 1, // استبدل بـ userId حقيقي
      totalPrice: 100, // استبدل بالقيمة الإجمالية للعربة
      items: [] // استبدل بالعناصر الفعلية من العربة
    })
    .then(() => alert('Order placed successfully'))
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          >
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
