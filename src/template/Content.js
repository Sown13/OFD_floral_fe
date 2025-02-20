import { Outlet } from "react-router-dom";

function Content() {
    return (
        <main className="flex-shrink-0 bg-light">
            <Outlet />
        </main>
    );
}

export default Content;
