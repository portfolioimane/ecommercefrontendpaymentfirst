import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user || user.role !== 'admin') {
    // Redirect to home if not authenticated or not an admin
    return <Navigate to="/" />;
  }

  return <Outlet />; // Render nested routes
};

export default AdminRoute;