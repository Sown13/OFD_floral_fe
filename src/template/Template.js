import { Outlet } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

function Template() {
    return (
        <>
            <Header />
            <ToastContainer />
            <Content />
            <Footer />
        </>
    );
}

export default Template;
