import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to='/homepage' />;
  }

  return <Outlet />;
};

export default PrivateRoute;