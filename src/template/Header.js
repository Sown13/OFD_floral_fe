import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import authenServices from "../services/authenServices";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toastMessage from "../components/Toast";

function Header() {
    const token = localStorage.getItem("token");
    const [decodedToken, setDecodedToken] = useState(null);

    function logout() {
        const refreshToken = localStorage.getItem("refreshToken");
        authenServices
            .logout(refreshToken)
            .then((response) => {
                toastMessage.info("Logout thành công");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 800);
            })
            .catch((error) => {
                toastMessage.error(error?.message || "❌ Logout thất bại!");
            });
    }

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
    }, []);

    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <FontAwesomeIcon icon={["fas", "store"]} className="ms-1" size="lg" />
                        <span className="ms-2 h5">Shop Florist</span>
                    </Link>

                    <div className={"navbar-collapse offcanvas-collaps"}>
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <Link to="/products" className="nav-link" replace>
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders_history" className="nav-link" replace>
                                    Order history
                                </Link>
                            </li>
                        </ul>
                        {decodedToken && (
                            <>
                                <button className="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#addFlower" title="Thêm mới">
                                    <FontAwesomeIcon icon={["fas", "plus"]} />
                                </button>
                                <button className="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#editFlower" title="Chỉnh sửa">
                                    <FontAwesomeIcon icon={["fas", "pencil"]} />
                                </button>
                            </>
                        )}
                        <Link to="/cart" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                            <span className="ms-2">Cart</span>
                        </Link>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a href="!#" className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={["fas", "user-alt"]} style={{ marginRight: "5px" }} />
                                    {decodedToken && decodedToken.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    {!token && (
                                        <li>
                                            <Link to="/login" className="dropdown-item">
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                    {!token && (
                                        <li>
                                            <Link to="/register" className="dropdown-item">
                                                Register
                                            </Link>
                                        </li>
                                    )}
                                    {token && (
                                        <li>
                                            <a href="#" className="dropdown-item" onClick={logout}>
                                                Logout
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="d-inline-block d-lg-none">
                        <button type="button" className="btn btn-outline-dark">
                            <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                            <span className="ms-3 badge rounded-pill bg-dark">0</span>
                        </button>
                        <button className="navbar-toggler p-0 border-0 ms-3" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
