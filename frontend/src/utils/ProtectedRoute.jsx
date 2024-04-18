import { useAuth } from "../context/AuthUser";

import { Login } from "../pages/LoginPage";
import { BaseLayout } from "../pages/BaseLayout";

export const ProtectedRoute = () => {
	let { userData } = useAuth();

	return userData ? <BaseLayout /> : <Login />;
};
