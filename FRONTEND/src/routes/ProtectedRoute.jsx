import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const BuyerProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" />;

  const role = user?.role || user?.Role;

  // ✅ if not buyer, send to correct dashboard
  if (role !== "buyer") {
    if (role === "farmer") return <Navigate to="/farmers/dashboard" />;
    if (role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default BuyerProtectedRoute;
