import api from "../api/api";

const cartService = {
    addToCart: async (items) => {
        try {
            const response = await api.post(`/cart/add`, items);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getCart: async () => {
        try {
            const response = await api.get(`/cart`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default cartService;
