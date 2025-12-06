// This file organizes all navigation inside the app.
// It keeps all routes clean and easy to manage.

import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages (your teammate’s UI pages)
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Reports from "./pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Rooms booking page */}
        <Route path="/rooms" element={<Rooms />} />

        {/* User bookings page */}
        <Route path="/Booking" element={<MyBookings />} />

        {/* Admin reports page */}
        <Route path="/reports" element={<Reports />} />

        {/* Default redirect */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
