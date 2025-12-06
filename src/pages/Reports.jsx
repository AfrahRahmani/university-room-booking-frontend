// 📄 Reports Page
// This page shows a simple admin-style table containing all room bookings.

import React, { useEffect, useState } from "react";
import "../assets/styles/Reports.css";
import bookingService from "../services/bookingService";

function Reports() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  // 🔄 Load all bookings from backend on page load
  useEffect(() => {
    const loadAllBookings = async () => {
      try {
        // Calling the backend to get ALL bookings
        const data = await bookingService.getAllBookings();
        setBookings(data || []);
      } catch (err) {
        console.error("❌ Failed to load reports:", err);
        setError(err.message || "Failed to load booking reports.");
      } finally {
        setLoading(false);
      }
    };

    loadAllBookings();
  }, []);

  return (
    <div className="reports-container">
      <h2>All Room Bookings (Admin Report)</h2>

      {/* ⏳ Loading State */}
      {loading && <p>Loading bookings...</p>}

      {/* ❌ Error State */}
      {!loading && error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {/* 📭 No Bookings */}
      {!loading && !error && bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {/* 📊 Table of Bookings */}
      {!loading && bookings.length > 0 && (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked By</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.room?.name || "Unknown room"}</td>
                <td>{b.date}</td>
                <td>
                  {b.startTime} – {b.endTime}
                </td>
                <td>{b.user?.email || "Unknown user"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reports;
