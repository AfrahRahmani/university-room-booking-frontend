// api/apiConfig.js

// 🧩 This file stores our API base URL.
// Why? So we can change it in ONE place instead of searching the whole project.
// Production API URL
// Local backend URL during development
const BASE_URL = import.meta.env.VITE_API_URL || 
"http://localhost:5000/api";

// Export it so we can import it anywhere in the frontend.
export default BASE_URL;