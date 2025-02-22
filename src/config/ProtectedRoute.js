import { Navigate, Outlet, useLocation } from "react-router-dom";
import toastMessage from "../components/Toast";

const ProtectedRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    if (!token) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
        toastMessage.info("Bạn cần đăng nhập để tiếp tục");
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
