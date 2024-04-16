import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthUser";

import { NavBar } from "../components/Navbar";
import { Login } from "../pages/LoginPage";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { Dashboard, FitnessCenter, People, Receipt } from "@mui/icons-material";

export const ProtectedRoute = () => {
	let { userData } = useAuth();

	if (userData) {
		return (
			<>
				<div className="flex">
					<Sidebar>
						<SidebarItem
							icon={<Dashboard />}
							text={"Dashboard"}
							url={"/dashboard"}
						/>
						<SidebarItem
							icon={<FitnessCenter />}
							text={"Equipments"}
							url={"/equipment"}
						/>
						<SidebarItem
							icon={<Receipt />}
							text={"Billing Log"}
							url={"/transactions"}
						/>
						<SidebarItem
							icon={<People />}
							text={"Manage User"}
							url={"/users"}
						/>
					</Sidebar>
					<div className="w-full">
						<NavBar />
						<div className="p-4">
							<Outlet />
						</div>
					</div>
				</div>
			</>
		);
	}

	return <Login />;
};
