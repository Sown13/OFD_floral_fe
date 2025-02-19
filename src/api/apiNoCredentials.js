import axios from "axios";

const apiNoCredentials = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiNoCredentials;
