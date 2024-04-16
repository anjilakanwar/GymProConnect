import { createContext, useState, useContext } from "react";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthUserProvider({ children }) {
	const [userData, setUserData] = useState();

	if (INITIAL_STATE.user && !userData) {
		setUserData(INITIAL_STATE.user);
	}

	const login = (userData) => {
		localStorage["user"] = JSON.stringify(userData);
		setUserData(userData);
	};

	const logout = () => {
		localStorage.removeItem("user");
		setUserData(null);
	};

	return (
		<AuthContext.Provider value={{ userData, login, logout, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
