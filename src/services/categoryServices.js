import api from "../api/api";
import toastMessage from "../components/Toast";

const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const categoryServices = {
    getCategories,
};

export default categoryServices;
