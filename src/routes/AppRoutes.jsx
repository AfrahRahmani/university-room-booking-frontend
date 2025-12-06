// AppRoutes.jsx — central navigation system for the entire app.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Login from "../pages/Login";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages (logged-in users only) */}
        <Route
          
        >
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
