import api from "../api/api";

const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const categoryServices = {
    getCategories,
};

export default categoryServices;
