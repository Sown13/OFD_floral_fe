import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import floralsServices from "../services/floralsServices";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import toastMessage from "../components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductDetail() {
    const { id } = useParams();
    const [floral, setFloral] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        floralsServices
            .getFloralById(id)
            .then((data) => {
                setFloral(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setLoading(false);
            });
    }, [id]);

    // Hàm giải mã token để lấy username
    const getUsernameFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã payload
            return payload.username;
        } catch (error) {
            console.error("Token không hợp lệ:", error);
            return null;
        }
    };

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toastMessage.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        const username = getUsernameFromToken(token);
        let cart = JSON.parse(localStorage.getItem(username)) || [];

        const existingProductIndex = cart.findIndex((item) => item._id === floral._id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1; // Tăng số lượng nếu sản phẩm đã có
        } else {
            cart.push({ ...floral, quantity: 1 }); // Thêm sản phẩm mới
        }

        localStorage.setItem(username, JSON.stringify(cart));
        toastMessage.success("Đã thêm sản phẩm vào giỏ hàng!");
    };

    if (loading) {
        return <div className="container mt-5">Đang tải dữ liệu...</div>;
    }

    if (!floral) {
        return <div className="container mt-5">Không tìm thấy sản phẩm.</div>;
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
                <ol className="breadcrumb p-3">
                    <li className="breadcrumb-item">
                        <Link className="text-decoration-none link-secondary" to="/products">
                            Tất cả sản phẩm
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {floral.name}
                    </li>
                </ol>
            </nav>

            <div className="row mb-4">
                <div className="col-lg-6">
                    <img className="border rounded ratio ratio-1x1" alt={floral.name} src={floral.cover} />
                </div>
                <div className="col-lg-5">
                    <h2 className="mb-1">{floral.name}</h2>
                    <h4 className="text-muted mb-4">{floral.price.toLocaleString()} VND</h4>

                    <div className="row g-3 mb-4">
                        <div className="col">
                            {floral.quantity > 0 ? (
                                <button className="btn btn-outline-dark py-2 w-100" onClick={addToCart}>
                                    <FontAwesomeIcon icon={["fas", "cart-plus"]} className="me-2" />
                                    Thêm vào giỏ
                                </button>
                            ) : (
                                <p className="text-danger fs-4 m-0 fw-bold d-block user-select-none">Hết hàng</p>
                            )}
                        </div>
                    </div>
                    <h4 className="mb-0">Chi tiết sản phẩm</h4>
                    <hr />
                    <div className="row">
                        <div className="col-sm-4">Loại Hoa</div>
                        <div className="col-sm-8 mb-3">{floral.categories || "Chưa cập nhật"}</div>
                        <div className="col-sm-4">Màu sắc</div>
                        <div className="col-sm-8 mb-3">{floral.color || "Chưa cập nhật"}</div>
                        <div className="col-sm-4">Trạng thái</div>
                        <div className="col-sm-8 mb-3">{floral.status || "Chưa cập nhật"}</div>
                        <div className="col-sm-4">Số lượng</div>
                        <div className="col-sm-8 mb-3">{floral.quantity || 0}</div>
                    </div>
                    <h4 className="mb-0">🌸 Mô tả</h4>
                    <hr />
                    <p className="lead">{floral.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
