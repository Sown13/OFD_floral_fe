import api from "../api/api";

const signUp = async (userData) => {
    try {
        const response = await api.post("/users/signup", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (credentials) => {
    try {
        const response = await api.post("/users/login", credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const logout = async (refreshToken) => {
    try {
        await api.post("/users/logout", { refreshToken: refreshToken });
    } catch (error) {
        throw error.response.data;
    }
};

const authenServices = {
    signUp,
    login,
    logout,
};

export default authenServices;
