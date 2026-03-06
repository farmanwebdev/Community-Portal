import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable cookies for cross-origin requests
});

/* Extract token from localStorage and add to Authorization header */
api.interceptors.request.use((config) => {
  // Read token from localStorage and add to Authorization header
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
