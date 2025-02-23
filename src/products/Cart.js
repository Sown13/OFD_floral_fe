import { useState, useEffect } from "react";
import toastMessage from "../components/Toast"; 
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState({ subtotal: 0, tax: 0, total: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = token ? JSON.parse(token).username : null;

        // Lấy giỏ hàng từ localStorage theo username
        const storedCart = username ? JSON.parse(localStorage.getItem(username)) || [] : [];
        setCartItems(storedCart);

        // Tính tổng tiền
        let subtotal = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let tax = subtotal * 0.05; // 5% thuế
        let total = subtotal + tax;
        setTotalPrice({ subtotal, tax, total });
    }, []);

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item._id !== productId);
        setCartItems(updatedCart);

        // Cập nhật localStorage
        const token = localStorage.getItem("token");
        if (token) {
            const username = JSON.parse(token).username;
            localStorage.setItem(username, JSON.stringify(updatedCart));
        }
        
        toastMessage.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
    };

    // Kiểm tra đăng nhập khi nhấn "Thanh Toán"
    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toastMessage.error("Bạn cần đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }
        toastMessage.success("Chuyển đến trang thanh toán...");
        navigate("/checkout");
    };

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <h5 className="text-left mb-4 ps-2">Cart List</h5>
            <div className="row">
                <div className="col-9">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Product Img</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sub Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={item.images} alt={item.name} width="50" height="50" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price.toLocaleString()} VND</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeFromCart(item._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Giỏ hàng trống!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-3 bg-light p-4">
                    <h5 className="text-left mb-4 pb-2">Cart Price</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <h6 className="fw-normal">Tax (5%):</h6>
                        <span>{totalPrice.tax.toLocaleString()} VND</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                        <h6 className="fw-normal">SubTotal Price:</h6>
                        <span>{totalPrice.subtotal.toLocaleString()} VND</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <h6>Total Price:</h6>
                        <span>{totalPrice.total.toLocaleString()} VND</span>
                    </div>
                    <button className="btn btn-dark mt-4 w-100" onClick={handleCheckout}>
                        Thanh Toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
