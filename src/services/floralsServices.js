import api from "../api/api";
import toastMessage from "../components/Toast";

const getFlorals = async (page, limit, search = "", stockStatus = "", filters = {}) => {
    try {
        const response = await api.get("/florals", {
            params: { page, limit, search, stockStatus, ...filters },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getFloralById = async (id) => {
    try {
        const response = await api.get(`/florals/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const createFloral = async (floralData) => {
    try {
        const response = await api.post("/florals", floralData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updateFloral = async (id, floralData) => {
    try {
        const response = await api.put(`/florals/${id}`, floralData);
        toastMessage.success("Update sản phẩm thành công");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteFloral = async (id) => {
    try {
        await api.delete(`/florals/${id}`);
        toastMessage.success("Xóa sản phẩm thành công");
    } catch (error) {
        throw error.response.data;
    }
};

const floralsServices = {
    getFlorals,
    getFloralById,
    createFloral,
    updateFloral,
    deleteFloral,
};

export default floralsServices;
