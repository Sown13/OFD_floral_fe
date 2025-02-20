import api from "../api/api";
import apiNoCredentials from "../api/apiNoCredentials";
import toastMessage from "../components/toastConfig";

const getFlorals = async () => {
  try {
    const response = await apiNoCredentials.get("/florals");
    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const getFloralById = async (id) => {
  try {
    const response = await apiNoCredentials.get(`/florals/${id}`);
    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const createFloral = async (floralData) => {
  try {
    const response = await api.post("/florals", floralData);
    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const updateFloral = async (id, floralData) => {
  try {
    const response = await api.put(`/florals/${id}`, floralData);
    return response.data;
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
  }
};

const deleteFloral = async (id) => {
  try {
    await api.delete(`/florals/${id}`);
    console.log(`Floral with ID ${id} deleted.`);
  } catch (error) {
    toastMessage.error(error.message);
    throw error;
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
