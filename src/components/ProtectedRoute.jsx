// 🔐 ProtectedRoute.jsx
// Checks if a valid login token exists. If not, user is redirected to login.

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
