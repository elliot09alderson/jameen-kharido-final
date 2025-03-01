import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  // Example: Check authentication state from Redux
  const { userInfo } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login page
  if (userInfo?.token) {
    // alert(userInfo?.email)
    return <Navigate to="/" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default PublicRoute;
