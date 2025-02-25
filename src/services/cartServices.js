import api from "../api/api";

const cartService = {
    addToCart: async (userId, items) => {
        userId = userId || "67bb8d52aaad8702150f75fc";
        console.log("User ID:", userId);
        console.log("Items to add:", items);
        try {
            // Gửi toàn bộ danh sách sản phẩm lên server
            const response = await api.post(`/cart/add`, items);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
            throw error;
        }
    },

    getCart: async (userId) => {
        try {
            const response = await api.get(`/cart`);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            throw error;
        }
    },
};

export default cartService;
