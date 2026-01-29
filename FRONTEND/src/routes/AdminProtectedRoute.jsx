import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!isLoggedIn) return <Navigate to="/login" />;

  const role = user?.Role || user?.role;

  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
