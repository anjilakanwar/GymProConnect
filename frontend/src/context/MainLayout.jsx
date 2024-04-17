import { createContext, useState } from "react";

export const MainLayoutContext = createContext();

export function MainLayoutProvider({ children }) {
	const [expanded, setExpanded] = useState(true);

	return (
		<MainLayoutContext.Provider value={{ expanded, setExpanded }}>
			{children}
		</MainLayoutContext.Provider>
	);
}
