// 🔐 useAuth Hook
// This custom hook manages everything related to authentication:
// logging in, logging out, registering, and keeping the user session.
// It's basically the "auth brain" of the frontend.

import { useState } from "react";
import authService from "../services/authService";

export default function useAuth() {
  // Load the saved user on page refresh
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🔓 Login function
  // Calls the backend → saves token + user → updates state
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);

      // Save to localStorage so session persists
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error("❌ Login failed:", error);
      return { success: false, message: error.message || "Login error" };
    }
  };

  // 📝 Register a new user
  const register = async (info) => {
    try {
      const response = await authService.register(info);
      return { success: true, data: response };
    } catch (error) {
      console.error("❌ Registration failed:", error);
      return { success: false, message: error.message };
    }
  };

  // 🚪 Logout the user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, register, logout };
}
