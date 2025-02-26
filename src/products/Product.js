import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import toastMessage from "../components/Toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product({ floral, index, percentOff = 15 }) {
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Invalid token:", error);
                setDecodedToken(null);
            }
        }
    }, [token]);

    if (!floral) {
        return <p>Loading product...</p>;
    }

    const addToCart = (item) => {
        if (!token) {
            toastMessage.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            setTimeout(() => {
                navigate("/login");
            }, 800);
            return;
        }
        const username = decodedToken.username;
        let userCart = JSON.parse(localStorage.getItem(username)) || [];
        let existingItem = userCart.find((cartItem) => cartItem._id === item._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            userCart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem(username, JSON.stringify(userCart));
        toastMessage.success(`Đã thêm ${item.name} vào giỏ hàng!`);
    };

    const isDiscounted = index < 2;
    const discountedPrice = isDiscounted ? floral.price * (1 - percentOff / 100) : floral.price;

    return (
        <div className="col">
            <div className="card shadow-sm product-card">
                <Link to={`/products/${floral._id}`} style={{ display: "block", height: "240px" }}>
                    {isDiscounted && (
                        <div className="badge bg-danger py-2 text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>
                            {percentOff}% OFF
                        </div>
                    )}
                    <img className="card-img-top bg-dark" style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={floral.name} src={floral.cover} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">{floral.name}</h5>
                    <p className="card-text text-center text-muted mb-0">
                        {isDiscounted ? (
                            <>
                                <del>{floral.price.toLocaleString()} VND</del> <span className="text-danger fw-bold">{discountedPrice.toLocaleString()} VND</span>
                            </>
                        ) : (
                            `${floral.price.toLocaleString()} VND`
                        )}
                    </p>
                    <div className="d-grid d-block">
                        {floral.quantity > 0 ? (
                            <button className="btn btn-outline-dark mt-3" onClick={() => addToCart(floral)}>
                                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Thêm vào giỏ
                            </button>
                        ) : (
                            <p className="text-danger text-center fw-bold mt-3 d-block user-select-none">Hết hàng</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
