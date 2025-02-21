import api from "../api/api";
import toastMessage from "../components/Toast";

const getFlorals = async (page, limit, search) => {
    try {
        const response = await api.get("/florals", {
            params: { page, limit, search },
        });
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const getFloralById = async (id) => {
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
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const updateFloral = async (id, floralData) => {
    try {
        const response = await api.put(`/florals/${id}`, floralData);
        return response.data;
    } catch (error) {
        toastMessage.error(error.message);
    }
};

const deleteFloral = async (id) => {
    try {
        await api.delete(`/florals/${id}`);
        console.log(`Floral with ID ${id} deleted.`);
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
