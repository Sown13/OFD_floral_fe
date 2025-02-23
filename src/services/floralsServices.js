import api from "../api/api";
import toastMessage from "../components/Toast";

const getFlorals = async (page, limit, search = "", filters = {}) => {
    if (!page || !limit) {
        toastMessage.error("Invalid request");
        return;
    }
    try {
        const response = await api.get("/florals", {
            params: { page, limit, search, ...filters },
        });
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const getFloralById = async (id) => {
    if (!id) {
        toastMessage.error("Invalid ID");
        return;
    }
    try {
        const response = await api.get(`/florals/${id}`);
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const createFloral = async (floralData) => {
    try {
        const response = await api.post("/florals", floralData);
        toastMessage.success("Thêm mới thành công");
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const updateFloral = async (id, floralData) => {
    if (!id) {
        toastMessage.error("Invalid ID");
        return;
    }
    try {
        const response = await api.put(`/florals/${id}`, floralData);
        toastMessage.success("Update sản phẩm thành công");
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const deleteFloral = async (id) => {
    if (!id) {
        toastMessage.error("Invalid ID");
        return;
    }
    try {
        await api.delete(`/florals/${id}`);
        toastMessage.success("Xóa sản phẩm thành công");
    } catch (error) {
        toastMessage.error(error.message);
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
