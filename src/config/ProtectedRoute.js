import { Navigate, Outlet } from "react-router-dom";
import toastMessage from "../components/Toast";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        toastMessage.info("Bạn cần đăng nhập để tiếp tục");
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
