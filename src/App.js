import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Template from "./template/Template";
import Cart from "./products/Cart";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/detail/ProductDetail";
import LoginForm from "./authen/LoginForm";
import RegisterForm from "./authen/RegisterForm";
import Landing from "./landing/Landing";
import ProtectedRoute from "./config/ProtectedRoute";

function App() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/login" && location.pathname !== "/register") {
            localStorage.setItem("redirectAfterLogin", location.pathname);
        }
    }, [location.pathname]);

    return (
        <Routes>
            <Route element={<Template />}>
                <Route path="/" element={<Landing />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
