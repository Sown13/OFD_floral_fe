import { createContext, useState } from "react";

export const RefreshContext = createContext();

export function RefreshProvider({ children }) {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshOutlet = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return <RefreshContext.Provider value={{ refreshKey, refreshOutlet }}>{children}</RefreshContext.Provider>;
}
