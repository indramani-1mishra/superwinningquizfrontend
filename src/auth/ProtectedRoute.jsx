import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, redirectPath = '/otp/login' }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
