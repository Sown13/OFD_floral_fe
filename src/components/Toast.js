import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
    className: "custom-toast",
};

const toastMessage = {
    success: (message) => toast.success(message, toastConfig),
    error: (message) => toast.error(message, toastConfig),
    warning: (message) => toast.warning(message, toastConfig),
    info: (message) => toast.info(message, toastConfig),
    default: (message) => toast(message, toastConfig),
};

export default toastMessage;
