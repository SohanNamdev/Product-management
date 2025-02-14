import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ message: "Please login first", from: location }} />;
  }

  return children;
};

export default ProtectedRoute;