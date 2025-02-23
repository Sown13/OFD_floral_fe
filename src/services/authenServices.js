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

const login = async (credentials) => {
    try {
        const response = await api.post("/users/login", credentials);
        if (response.data) {
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            toastMessage.success("Đăng nhập thành công!");
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            setTimeout(() => {
                window.location.href = redirectPath;
            }, 1000);
        }
    } catch (error) {
        toastMessage.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
};

const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        await api.post("/users/logout", { refreshToken: refreshToken });
        toastMessage.info("Logout thành công");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setTimeout(() => {
            window.location.href = "/login";
        }, 800);
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const authenServices = {
    signUp,
    login,
    logout,
};

export default authenServices;
