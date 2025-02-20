import api from "../api/api";
import apiNoCredentials from "../api/apiNoCredentials";
import toastMessage from "../components/toastConfig";

const signUp = async (userData) => {
  try {
    const response = await apiNoCredentials.post("/signup", userData);
    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await apiNoCredentials.post("/login", credentials);
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
    toastMessage.error(error.message, "Clearing token anyway");
  }
  localStorage.removeItem("token");
  console.log("User logged out.");
};

const authenServices = {
  signUp,
  login,
  logout,
};

export default authenServices;
