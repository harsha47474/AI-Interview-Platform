import axios from "axios";

/**
 * api - Pre-configured Axios instance that automatically uses the correct
 * backend URL in both development (localhost:3000) and production environments.
 *
 * Usage: import api from "../utils/api";
 *        api.get("/api/user/current-user")
 *        api.post("/api/interview/submit", data)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // Always send cookies for session auth
});

export default api;
