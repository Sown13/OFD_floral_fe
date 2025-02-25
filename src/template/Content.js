import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { RefreshContext } from "../components/RefreshOutLet";
import { Modal } from "./Modal";

function Content() {
    const { refreshKey } = useContext(RefreshContext);
    return (
        <main className="flex-shrink-0 bg-light">
            <Outlet key={refreshKey} />
            <Modal />
        </main>
    );
}

export default Content;
