import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/LoginPage";
import { Dashboard } from "./pages/DashboardPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Landing } from "./pages/LandingPage";
import { Error } from "./pages/ErrorPage";
import { Equipments } from "./pages/adminPages/Equipment";
import { PurchaseLog } from "./pages/adminPages/PurchaseLog";
import { Users } from "./pages/adminPages/Users";
import { useEffect } from "react";

export const App = () => {
	useEffect(() => {
		
	})
	return (
		<>
			<Routes>
				<Route index element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="landing" element={<Landing />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="equipment" element={<Equipments />} />
					<Route path="transactions" element={<PurchaseLog />} />
					<Route path="users" element={<Users />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
};
