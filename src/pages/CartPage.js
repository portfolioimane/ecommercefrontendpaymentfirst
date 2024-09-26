import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCart,
  getCartSuccess,
  getCartFailure,
  loadGuestCart,
  removeFromCart,
  removeFromGuestCart,
} from '../redux/cartSlice';
import { setRedirectPath } from '../redux/authSlice';
import axios from '../axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items || []);
  const guestItems = useSelector(state => state.cart.guestItems || []);
  const loading = useSelector(state => state.cart.loading);
  const error = useSelector(state => state.cart.error);
  const isLoggedIn = useSelector(state => !!state.auth.token);

  useEffect(() => {
    const fetchCart = async () => {
      dispatch(getCart());
      if (isLoggedIn) {
        try {
          const response = await axios.get('/api/cart');
          const items = response.data.items || [];
          dispatch(getCartSuccess(items));
        } catch (err) {
          dispatch(getCartFailure(err.message));
        }
      } else {
        dispatch(loadGuestCart());
      }
    };
    fetchCart();
  }, [dispatch, isLoggedIn]);

  const handleRemoveFromCart = (id) => {
    if (isLoggedIn) {
      axios.delete(`/api/cart/${id}`).then(() => {
        dispatch(removeFromCart(id));
      }).catch(error => {
        console.error('Error removing item from cart:', error);
      });
    } else {
      dispatch(removeFromGuestCart(id));
    }
  };

  const calculateTotalPrice = () => {
    const items = isLoggedIn ? cart : guestItems;
    return items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  };

  const totalPrice = calculateTotalPrice().toFixed(2);

  if (loading) {
    return <Typography className="loading">Loading cart...</Typography>;
  }
  if (error) {
    return <Typography className="error">Error loading cart: {error}</Typography>;
  }

  const displayCart = isLoggedIn ? cart : guestItems;

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      dispatch(setRedirectPath('/checkout'));
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      <Typography variant="h4">Your Cart</Typography>
      {displayCart.length === 0 ? (
        <Typography className="empty-cart">Cart is empty</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table className="cart-table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayCart.map(item => (
                <TableRow key={item.id} className="cart-item">
                  <TableCell>
                    <img
                         src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`} 
                      alt={isLoggedIn && item.product ? item.product.name : item.name || 'Unknown Product'}
                      className="item-image"
                    />
                    <span>{isLoggedIn && item.product ? item.product.name : item.name || 'Loading...'}</span>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{Number(item.price).toFixed(2)} MAD</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      className="remove-button"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="total-price">
        <Typography variant="h5">Total Price: {totalPrice} MAD</Typography>
      </div>
      <Button 
        variant="contained" 
        className="checkout-button"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartPage;
