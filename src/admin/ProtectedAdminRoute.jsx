import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token"); // ✅ match key used in login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
