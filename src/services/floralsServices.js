import axios from "axios";

const URL = axios.create({
  baseURL: "http://localhost:8080",
});

// Lấy danh sách tất cả florals
export const getFlorals = async () => {
  try {
    const response = await URL.get("/florals");
    return response.data;
  } catch (error) {
    console.error("Error fetching florals:", error.response?.data || error.message);
    throw error;
  }
};

// Lấy chi tiết một floral theo ID
export const getFloralById = async (id) => {
  try {
    const response = await URL.get(`/florals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching floral:", error.response?.data );
    throw error;
  }
};

// Thêm một floral mới
export const createFloral = async (floralData) => {
  try {
    const response = await URL.post("/florals", floralData);
    return response.data;
  } catch (error) {
    console.error("Error creating floral:", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật thông tin một floral
export const updateFloral = async (id, floralData) => {
  try {
    const response = await URL.put(`/florals/${id}`, floralData);
    return response.data;
  } catch (error) {
    console.error("Error updating floral:", error.response?.data || error.message);
    throw error;
  }
};

// Xóa một floral
export const deleteFloral = async (id) => {
  try {
    await URL.delete(`/florals/${id}`);
    console.log(`Floral with ID ${id} deleted.`);
  } catch (error) {
    console.error("Error deleting floral:", error.response?.data || error.message);
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