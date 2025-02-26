import { useState, useEffect } from "react";
import cartService from "../services/cartServices";
import toastMessage from "../components/Toast";

function OrderHistory() {
    const [history, setHistory] = useState([]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };
    useEffect(() => {
        cartService
            .getCart()
            .then((response) => {
                setHistory(response);
            })
            .catch((error) => {
                toastMessage.error(error?.message || "❌ Lỗi khi tải danh đơn hàng!");
            });
    }, []);

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <h4 className="text-left mb-4 ps-2">Orders History</h4>
            {history && history.length > 0 ? (
                <div className="table-responsive">
                    <table
                        className="table table-bordered"
                        style={{
                            borderSpacing: "0 2px",
                            borderCollapse: "separate",
                        }}
                    >
                        <thead>
                            <tr>
                                <th rowSpan={2} className="text-center align-middle" style={{ width: "5%" }}>
                                    #
                                </th>
                                <th rowSpan={2} className="text-center align-middle" style={{ width: "20%" }}>
                                    Ngày đặt
                                </th>
                                <th rowSpan={2} className="text-center align-middle" style={{ width: "15%" }}>
                                    Tổng tiền
                                </th>
                                <th colSpan={3} className="text-center align-middle">
                                    Chi tiết
                                </th>
                            </tr>
                            <tr>
                                <th className="text-center align-middle" style={{ width: "30%" }}>
                                    Sản phẩm
                                </th>
                                <th className="text-center align-middle" style={{ width: "15%" }}>
                                    Số lượng
                                </th>
                                <th className="text-center align-middle" style={{ width: "15%" }}>
                                    Đơn giá
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((order, index) => (
                                <tr>
                                    <td className="text-center align-middle">{index + 1}</td>
                                    <td className="text-center align-middle">{formatDate(order.date)}</td>
                                    <td className="text-center align-middle">{order.total}</td>
                                    <td colSpan={3} className="p-0">
                                        <table className="table table-bordered mb-0">
                                            <tbody>
                                                {order.items.map((item, itemIndex) => (
                                                    <tr key={item.floralId || itemIndex}>
                                                        <td style={{ width: "30%" }} className="align-middle">
                                                            {item.name}
                                                        </td>
                                                        <td style={{ width: "15%" }} className="text-center align-middle">
                                                            {item.quantity}
                                                        </td>
                                                        <td style={{ width: "15%" }} className="text-center align-middle">
                                                            {item.price}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Bạn chưa mua hàng</p>
            )}
        </div>
    );
}

export default OrderHistory;
