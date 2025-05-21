import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // Nếu route yêu cầu xác thực (requireAuth = true)
  if (requireAuth) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    if (!isAuthenticated) {
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
    // Nếu đã đăng nhập, cho phép truy cập
    return children;
  }

  // Nếu route không yêu cầu xác thực (requireAuth = false)
  // Ví dụ: trang login, register
  if (isAuthenticated) {
    // Nếu đã đăng nhập, chuyển hướng về trang chủ
    return <Navigate to="/" replace />;
  }
  // Nếu chưa đăng nhập, cho phép truy cập
  return children;
};

export default PrivateRoute; 