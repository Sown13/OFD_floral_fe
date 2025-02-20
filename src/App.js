import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./template/Template";
import Cart from "./products/Cart";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/detail/ProductDetail";
import LoginForm from "./authen/LoginForm";
import RegisterForm from "./authen/RegisterForm";
import Landing from "./landing/Landing";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Template />}>
                <Route index element={<Landing />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="cart" element={<Cart />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
