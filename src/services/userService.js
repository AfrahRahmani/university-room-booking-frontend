// 🌟 userService.js
// This file handles all user-related communication with the backend.
// It keeps the logic clean so the rest of the app doesn't worry about API calls.

import axios from "axios";
import BASE_URL from "../api/apiConfig";

// 👉 Register a new user
export async function registerUser(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register`, formData);
    return response.data; // return useful backend data
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error.response?.data || { message: "Registration failed" };
  }
}

// 👉 Login user
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, credentials);

    // Save token for authenticated requests
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error.response?.data || { message: "Login failed" };
  }
}

// 👉 Logout user
export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
}

