import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { RefreshProvider } from "../components/RefreshOutLet";

function Template() {
    return (
        <>
            <Header />
            <ToastContainer />
            <RefreshProvider>
                <Content />
            </RefreshProvider>
            <Footer />
        </>
    );
}

export default Template;
