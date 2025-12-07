// 🌐 apiClient.js
// This file creates a reusable Axios instance that all API requests use.
// The main idea is to avoid repeating the base URL and headers in every request.

import axios from "axios";
import BASE_URL from "../api/apiConfig";

console.log("NEW BUILD LOADED 🔧 API Client Base URL:", BASE_URL);

// 🔧 Creating the Axios instance with default settings
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request interceptor - runs before every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("📤 Making request to:", config.baseURL + config.url);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Token attached");
  } else {
    console.log("⚠️ No token found");
  }

  return config;
}, (error) => {
  console.error("❌ Request error:", error);
  return Promise.reject(error);
});

// Response interceptor - runs after every response
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.status);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received");
      console.error("Request:", error.request);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
