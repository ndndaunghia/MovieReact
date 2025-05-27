import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const isUserAdmin = user?.data?.type === 1;

  if (isAdmin && !isUserAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAdmin && isUserAdmin) {
    return <Navigate to="/admin/movies" replace />;
  }

  return children;
};

export default ProtectedRoute;