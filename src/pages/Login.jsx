// 📌 Login.jsx
// This page handles the login logic for the system.
// The user enters their official university email and we save it in localStorage.

import React, { useState } from "react";
import "../assets/styles/Login.css";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Add password field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email domain
    if (!email.endsWith("@uqu.edu.sa")) {
      setError("Please use your official university email ending with @uqu.edu.sa");
      return;
    }

try {
      setLoading(true);
      console.log("🔐 Attempting login with:", email);

      // Call backend login through authService
      const response = await authService.login({ 
        email, 
        password
      });

      console.log("✅ Login successful:", response);

      // Redirect to rooms page
      navigate("/rooms");
    } catch (err) {
      console.error("❌ Login failed:", err);
      
      // Better error messages
      if (err.message === "Network Error") {
        setError("Cannot connect to server. Make sure backend is running on port 5000.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-container">
        <h2>University Room Booking</h2>
        <p className="hint">Enter your university email to log in</p>

        {error && (
          <div style={{ 
            color: "red", 
            fontSize: "14px", 
            marginBottom: "10px",
            padding: "10px",
            background: "#ffebee",
            borderRadius: "5px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="example@uqu.edu.sa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <small className="note">
            * Email must end with <b>@uqu.edu.sa</b>
          </small>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
          <p>Test credentials:</p>
          <p>Email: student@uqu.edu.sa</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
