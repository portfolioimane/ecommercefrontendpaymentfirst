import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    redirectPath: null, // New property for redirect path
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.redirectPath = null; // Clear redirect path on successful login
    },
    setRedirectPath(state, action) {
      state.redirectPath = action.payload; // Set redirect path
    },
    registerSuccess(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, setRedirectPath, registerSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;
