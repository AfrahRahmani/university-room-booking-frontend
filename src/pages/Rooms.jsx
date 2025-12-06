// 📌 Rooms.jsx
// This page displays a list of all available rooms and allows the user to create a booking.
// Everything here talks directly to the backend using roomService + bookingService.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Rooms.css";

// Services (clean API wrappers)
import roomService from "../services/roomService";
import bookingService from "../services/bookingService";

function Rooms() {
  const navigate = useNavigate();
  // Store list of rooms
 const [rooms, setRooms] = useState([]);


  // Store booking form inputs
  const [selectedRoom, setSelectedRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loadingRooms, setLoadingRooms] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // 🔄 Load rooms from backend on page load
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoadingRooms(true);

        // Fetch rooms using the service
        const data = await roomService.getRooms();

        setRooms(data || []);
      } catch (error) {
        console.error("❌ Failed to load rooms:", error);
        alert("Failed to load rooms. Please try again.");
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
  }, []);

  // 🧾 Handle booking form submission
  const handleBooking = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to make a booking.");
      navigate("/login");
      return;
    }

    const bookingData = {
      user: userId,
      room: selectedRoom,
      date,
      startTime,
      endTime,
    };

    try {
      setBookingLoading(true);

      // Create booking using backend
      await bookingService.createBooking(bookingData);

      alert("🎉 Room booked successfully!");

      // Reset form
      setSelectedRoom("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("❌ Booking failed:", error);
      alert(error?.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="room-page-wrapper">
      <div className="room-box">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/rooms')} style={{ padding: '8px 16px', background: '#4b9ec0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📅 Rooms
          </button>
          <button onClick={() => navigate('/bookings')} style={{ padding: '8px 16px', background: '#4b9ec0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📋 My Bookings
          </button>
          <button onClick={() => navigate('/reports')} style={{ padding: '8px 16px', background: '#4b9ec0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            📊 Reports
          </button>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ padding: '8px 16px', background: '#4b9ec0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
        <h2>Book a Room</h2>

        {/* Loading State */}
        {loadingRooms ? (
          <p>Loading available rooms...</p>
        ) : (
          <form onSubmit={handleBooking} className="booking-form">
            {/* Room selection dropdown */}
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            >
              <option value="">-- Choose Room --</option>

              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name} (Capacity: {room.capacity})
                </option>
              ))}
            </select>

            {/* Date input */}
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Start time */}
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

            {/* End time */}
            <input
              type="time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />

            <button type="submit" disabled={bookingLoading}>
              {bookingLoading ? "Booking..." : "Book"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Rooms;
