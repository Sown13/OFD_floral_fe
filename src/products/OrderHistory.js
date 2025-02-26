import { useState, useEffect } from "react";
import cartService from "../services/cartServices";

function OrderHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await cartService.getCart();
                setHistory(response.data);
            } catch (error) {
                console.error("❌ Error fetching cart:", error);
            }
        };
        fetchCart();
    }, []);   

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <h4 className="text-left mb-4 ps-2">Orders History</h4>
            { history && history.length > 0 ? (
                <ul>
                    {history.map((order, index) => (
                        <li key={index}>{order.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Bạn chưa mua hàng</p>
            )}
        </div>
    );
}

export default OrderHistory;
