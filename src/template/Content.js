import { Outlet } from "react-router-dom";
import { Modal } from "./Modal";

function Content() {
    return (
        <main className="flex-shrink-0 bg-light">
            <Outlet />
            <Modal />
        </main>
    );
}

export default Content;
