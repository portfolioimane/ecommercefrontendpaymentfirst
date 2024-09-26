import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../axios'; // Ensure axios is configured correctly
import { loginSuccess, setError } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearGuestCart, getCartSuccess } from '../../redux/cartSlice'; // Import getCartSuccess action
import './Login.css'; // Import custom CSS for styling

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const redirectPath = useSelector((state) => state.auth.redirectPath); // Get the redirect path
  const guestItems = useSelector((state) => state.cart.guestItems); // Get guest items from the state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const transferCartToDatabase = async () => {
    console.log('Transferring guest cart items to the database:', guestItems);
    for (const item of guestItems) {
      try {
        console.log(`Transferring item with ID: ${item.id}, Quantity: ${item.quantity}`);
        await axios.post(`/api/cart/addtocart/${item.id}`, {
          quantity: item.quantity,
        });
        console.log(`Successfully transferred item ID: ${item.id}`);
      } catch (error) {
        console.error('Error transferring cart item:', error);
      }
    }

    // Clear guest cart after transferring
    console.log('Clearing guest cart after transfer');
    dispatch(clearGuestCart());
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/cart'); // Fetch cart items
      const items = response.data.items || [];
      dispatch(getCartSuccess(items)); // Dispatch action with fetched items
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted with email:', email);
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Login successful, response:', response.data);
      dispatch(loginSuccess(response.data));

      // Transfer cart items to the database
      await transferCartToDatabase();

      // Fetch cart items after login
      await fetchCartItems();

      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Redirecting to:', redirectPath || '/');
        navigate(redirectPath || '/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to login. Check your credentials.';
      console.error('Login error:', errorMessage);
      dispatch(setError(errorMessage));
    }
  };

  return (
    <Container className="login-container mt-5">
      <h2 className="text-center mb-4">Login to Your Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="login-input"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="login-input"
          />
        </Form.Group>
        <Button
          variant="warning" // Use yellow color for the button
          type="submit"
          className="login-button mt-3"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
