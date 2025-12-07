// 📅 bookingService.js
// This file contains all functions related to room bookings.
// I created these helpers to keep the API calls clean and organized
// instead of writing fetch/axios everywhere inside the pages.
import apiClient from "./apiClient";

const bookingService = {
  // Create booking
  createBooking: async (bookingData) => {
    const response = await apiClient.post("/api/bookings", bookingData);
    return response.data;
  },

  // User bookings
  getUserBookings: async (userId) => {
    const response = await apiClient.get(`/api/bookings/${userId}`);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await apiClient.delete(`/api/bookings/cancel/${id}`);
    return response.data;
  },

  // Admin: get ALL bookings
  getAllBookings: async () => {
    const response = await apiClient.get("/api/bookings");
    return response.data;
  }
};

export default bookingService;
