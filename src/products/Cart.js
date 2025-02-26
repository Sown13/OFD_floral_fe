import { useState, useEffect } from "react";
import toastMessage from "../components/Toast";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartServices";
import { jwtDecode } from "jwt-decode";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState({ subtotal: 0, total: 0 });
    const navigate = useNavigate();
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
                const username = decoded.username;
                const storedCart = username ? JSON.parse(localStorage.getItem(username)) || [] : [];
                updateCartAndTotal(storedCart);
            } catch (error) {
                console.error("Invalid token:", error);
                setDecodedToken(null);
            }
        }
    }, []);

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        updateCartAndTotal(updatedCart);
    };

    // Hàm giảm số lượng sản phẩm
    const decreaseQuantity = (productId) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        updateCartAndTotal(updatedCart);
    };

    // Hàm cập nhật giỏ hàng và tổng tiền
    const updateCartAndTotal = (updatedCart) => {
        setCartItems(updatedCart);
        const username = decodedToken?.username;
        localStorage.setItem(username, JSON.stringify(updatedCart));
        const subtotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const total = subtotal;
        setTotalPrice({ subtotal, total });
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item._id !== productId);
        updateCartAndTotal(updatedCart);
        toastMessage.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
    };

    // Thanh toán và lưu đơn hàng vào DB Hải chưa xử lý nhé các anh em
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toastMessage.error("Bạn cần đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }

        const username = decodedToken?.username;
        const storedCart = JSON.parse(localStorage.getItem(username)) || [];

        if (storedCart.length === 0) {
            toastMessage.error("Giỏ hàng trống, không thể thanh toán!");
            return;
        }
        cartService
            .addToCart(
                storedCart.map((item) => ({
                    floralId: item._id,
                    quantity: item.quantity,
                }))
            )
            .then((response) => {
                localStorage.removeItem(username);
                setCartItems([]);
                setTotalPrice({ subtotal: 0, total: 0 });
                toastMessage.success("Đã lưu đơn hàng !");
            })
            .catch((error) => {
                toastMessage.error(error?.message || "❌ Lỗi khi lưu đơn hàng!");
            });
    };

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <h4 className="text-left mb-4 ps-2">Cart List</h4>
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
                                            <img src={item.cover} alt={item.name} width="50" height="50" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price.toLocaleString()} VND</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                    onClick={() => decreaseQuantity(item._id)}
                                                    disabled={item.quantity === 1} // Không giảm dưới 1
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => increaseQuantity(item._id)}>
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>
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
                    <div className="d-flex justify-content-between mb-4">
                        <h6 className="fw-normal">SubTotal Price:</h6>
                        <span>{totalPrice.subtotal.toLocaleString()} VND</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <h6>Total Price:</h6>
                        <span>{totalPrice.total.toLocaleString()} VND</span>
                    </div>
                    <button className="btn btn-dark mt-4 w-100" onClick={handleCheckout}>
                        Mua
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
