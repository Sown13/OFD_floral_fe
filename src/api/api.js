import axios from "axios";
import authenServices from "../services/authenServices";
import toastMessage from "../components/Toast";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (
            ["post", "put", "delete"].includes(config.method) &&
            config.url.startsWith("/florals")
        ) {
            if (!token) {
                window.location.href = "/login";
                return Promise.reject(new Error("Unauthorized: No token found"));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authenServices.logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
