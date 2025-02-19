import axios from "axios";
import authenServices from "../services/authenServices";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");
      authenServices.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
