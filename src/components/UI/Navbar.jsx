// 📌 Navbar.jsx — styled to match the design in the screenshot
import { Link } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
  return (
    <nav className="top-navbar">
      <h2 className="navbar-title">Room Booking System</h2>

      <div className="navbar-links">
        <Link to="/rooms" className="nav-btn">Rooms</Link>
        <Link to="/bookings" className="nav-btn">My Bookings</Link>
        <Link to="/reports" className="nav-btn">Reports</Link>
        <Link to="/login" className="nav-btn logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
