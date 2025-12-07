// 🌐 AuthService.js
// Central place for all auth-related API calls.

import apiClient from "./apiClient";

const authService = {
  // 🔐 Login user
  login: async (credentials) => {
    console.log("🔐 AuthService: Attempting login...");
    console.log("📧 Email:", credentials.email);
    
    try {
      const response = await apiClient.post("/users/login", credentials);
      console.log("✅ AuthService: Login response received", response.data);

      const { token, user } = response.data;

      // Save token so apiClient can attach it automatically
      if (token) {
        localStorage.setItem("token", token);
        console.log("💾 Token saved to localStorage");
      }

      // Save user info for later usage (like userId)
      if (user?.id) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("💾 User saved to localStorage:", user.id);
      }

      return response.data;
    } catch (error) {
      console.error("❌ AuthService: Login failed", error);
      throw error;
    }
  },

  // ➕ Register a new user
  register: async (userData) => {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  },

  // 🚪 Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // Remove old token too
    console.log("🚪 Logged out, cleared localStorage");
  },
};

export default authService;