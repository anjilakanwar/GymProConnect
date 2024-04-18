import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthUser";

import { NavBar } from "../components/Navbar";
import { Login } from "../pages/LoginPage";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
	Dashboard,
	FitnessCenter,
	People,
	Receipt,
	Warehouse,
} from "@mui/icons-material";
import { MainLayoutProvider } from "../context/MainLayout";

export const ProtectedRoute = () => {
	let { userData } = useAuth();

	if (userData) {
		return (
			<>
				<MainLayoutProvider>
					<div className="flex">
						<Sidebar expanded setExpanded>
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
							<SidebarItem
								icon={<Warehouse />}
								text={"Supplier List"}
								url={"/supplier"}
							/>
						</Sidebar>
						<div className="w-full">
							<NavBar />
							<div className="p-4">
								<Outlet />
							</div>
						</div>
					</div>
				</MainLayoutProvider>
			</>
		);
	}

	return <Login />;
};
