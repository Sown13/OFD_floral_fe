import api from "../api/api";
import toastMessage from "../components/Toast";

const signUp = async (userData) => {
    try {
        const response = await api.post("/signup", userData);
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const login = async (credentials, navigate) => {
    try {
        const response = await api.post("/login", credentials);
        const { token } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            toastMessage.success("Đăng nhập thành công!");
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/dashboard";
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectPath);
        }
    } catch (error) {
        toastMessage.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
};

const logout = async () => {
    try {
        await api.post("/logout");
    } catch (error) {
        toastMessage.error(error.message, "Clearing token anyway");
    }
    localStorage.removeItem("token");
};

const authenServices = {
    signUp,
    login,
    logout,
};

export default authenServices;
