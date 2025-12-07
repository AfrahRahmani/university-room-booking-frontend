// 🏫 roomService.js
// This file contains all room-related API calls.
// Keeping them here makes our code cleaner and easier to maintain.

import apiClient from "./apiClient";

const roomService = {
  // 📌 Fetch all available rooms from the backend
  getRooms: async () => {
    const response = await apiClient.get("/api/rooms");
    return response.data; // return clean data
  },

  // ➕ Create a new room (admin only)
  createRoom: async (roomData) => {
    const response = await apiClient.post("/api/rooms/add", roomData);
    return response.data;
  },
};

export default roomService;
