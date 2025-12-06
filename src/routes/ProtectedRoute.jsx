// 🔐 ProtectedRoute.jsx
// This component protects pages that should only be visible
// to logged-in users. If no token exists, we redirect them to /login.

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check for BOTH possible token names for compatibility
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");

  // If the token is missing → user is not logged in
  if (!token) {
    console.warn("⚠️ No auth token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow access
  return children;
}

export default ProtectedRoute;
