import { createSlice } from '@reduxjs/toolkit';

// Load initial cart state from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

// Initial state of the cart
const initialState = {
  items: [], // For logged-in users
  guestItems: loadCartFromLocalStorage(), // For guest users
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state) => {
      state.loading = true;
    },
    getCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload; // Store fetched items for logged-in user
    },
    getCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store error message
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Update quantity
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 }); // Add new item
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId); // Remove item
    },
    clearCart: (state) => {
      state.items = []; // Clear cart for logged-in user
    },
   
    // Guest user actions
    addToGuestCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.guestItems.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Update quantity for guest
      } else {
        state.guestItems.push({ ...item, quantity: item.quantity || 1 }); // Add new item for guest
      }
      localStorage.setItem('cart', JSON.stringify(state.guestItems)); // Save to local storage
    },
    removeFromGuestCart: (state, action) => {
      const itemId = action.payload;
      state.guestItems = state.guestItems.filter(item => item.id !== itemId); // Remove item for guest
      localStorage.setItem('cart', JSON.stringify(state.guestItems)); // Save to local storage
    },
    clearGuestCart: (state) => {
      state.guestItems = []; // Clear cart for guest
      localStorage.removeItem('cart'); // Remove from local storage
    },
      loadGuestCart: (state) => {
      state.loading = false; // Set loading to false for guest items
      state.guestItems = loadCartFromLocalStorage(); // Load guest items from local storage
    },
    
  },
});

// Exporting actions
export const {
  getCart,
  getCartSuccess,
  getCartFailure,
  addToCart,
  removeFromCart,
  clearCart,
  addToGuestCart,
  removeFromGuestCart,
  clearGuestCart,
  loadGuestCart
} = cartSlice.actions;

// Exporting the reducer
export default cartSlice.reducer;
