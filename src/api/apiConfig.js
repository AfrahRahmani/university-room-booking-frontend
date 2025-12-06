// api/apiConfig.js

// 🧩 This file stores our API base URL.
// Why? So we can change it in ONE place instead of searching the whole project.

// Local backend URL during development
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Export it so we can import it anywhere in the frontend.
export default BASE_URL;