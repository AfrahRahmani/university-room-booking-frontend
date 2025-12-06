// 📘 MyBookings.jsx
// Shows all bookings belonging to the logged-in user (backend-connected version).

import React, { useEffect, useState } from "react";
import "../assets/styles/MyBookings.css";
import bookingService from "../services/bookingService";

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Load bookings for this user when the page loads
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // If somehow userId is missing → session is broken
        if (!userId) {
          setError("No user session found. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch all bookings from backend for this user
        const bookings = await bookingService.getUserBookings(userId);

        setMyBookings(bookings || []);
      } catch (err) {
        console.error("❌ Failed to load bookings:", err);
        setError(err.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ❌ Handle cancel booking
  const handleCancel = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmDelete) return;

    try {
      // Delete booking from backend
      await bookingService.cancelBooking(bookingId);

      // Remove it from UI instantly
      setMyBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("❌ Failed to cancel booking:", err);
      alert(err.message || "Failed to cancel booking.");
    }
  };

  // 🧭 Loading state
  if (loading) {
    return (
      <div className="bookings-container">
        <h2>My Bookings</h2>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="bookings-container">
        <h2>My Bookings</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // 📌 Render actual booking list
  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>

      {myBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.room?.name || "Unknown room"}</td>
                <td>{booking.date}</td>
                <td>
                  {booking.startTime} - {booking.endTime}
                </td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;
