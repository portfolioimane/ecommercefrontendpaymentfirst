import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const isLoggedIn = useSelector(state => !!state.auth.token);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('/api/orders');
          setOrders(response.data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }
  }, [isLoggedIn]);

  const handleViewOrder = (orderId) => {
    navigate(`/orders/order-details/${orderId}`); // Updated path
  };

  return (
    <div className="order-content">
      <h3>My Orders</h3>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Price (MAD)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{Number(order.total_price).toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleViewOrder(order.id)}>View Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;
