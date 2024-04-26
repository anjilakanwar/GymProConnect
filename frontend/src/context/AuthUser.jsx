import { createContext, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthUserProvider({ children }) {
	const [userData, setUserData] = useState();
	const [role, setRole] = useState();

	if (INITIAL_STATE.user && !userData) {
		setUserData(INITIAL_STATE.user);
		var role = axiosInstance(userData.token)
			.get("accounts/user_role/")
			.then((res) => res);
		setRole(
			
		);
		setUserData({ ...userData, role });
	}

	const login = (userData) => {
		localStorage["user"] = JSON.stringify(userData);
		setUserData(userData);
		setRole(
			axiosInstance(userData.token)
				.get("accounts/user_role/")
				.then((res) => res)
		);
		setUserData({ ...userData, role });

		console.log(role);
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
