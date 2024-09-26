import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios'; // Ensure this path is correct
import './OrderDetailsPage.css'; // Create this CSS file for styling

const OrderDetailsPage = () => {
  const { id } = useParams(); // Get the order ID from the route parameters
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        setOrderDetails(response.data.order);
        console.log(response.data.order);
      } catch (err) {
        setError('Error fetching order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="order-details-page">
      <h2>Order Details</h2>
      <div className="order-info">
        <h3>Order ID: {orderDetails.id}</h3>
        <p>Name: {orderDetails.name}</p>
        <p>Email: {orderDetails.email}</p>
        <p>Phone: {orderDetails.phone}</p>
        <p>Address: {orderDetails.address}</p>
        <p>Total Price: {Number(orderDetails.total_price).toFixed(2)} MAD</p>
        <p>Payment Method: {orderDetails.payment_method}</p>
        <p>Status: {orderDetails.status}</p>
      </div>
      <h3>Order Items</h3>
      <table className="order-items-table">
        <thead>
          <tr>
            <th>Product Name</th> {/* Changed from Product ID to Product Name */}
            <th>Quantity</th>
            <th>Price (MAD)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map(item => (
            <tr key={item.product_id}>
              <td>{item.product.name}</td> {/* Accessing the product name */}
              <td>{item.quantity}</td>
              <td>{Number(item.price).toFixed(2)}</td>
              <td>
                {item.image ? (
                  <img src={item.image} alt={`Product ${item.product.name}`} width="50" />
                ) : (
                  'No image available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsPage;
