import { Outlet } from "react-router-dom";

import { NavBar } from "../components/Navbar";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
	Dashboard,
	FitnessCenter,
	LocalShipping,
	People,
	Receipt,
	Warehouse,
} from "@mui/icons-material";
import { MainLayoutProvider } from "../context/MainLayout";
import { useAuth } from "../context/AuthUser";

export const BaseLayout = () => {
	const { userData } = useAuth();

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
						{userData.is_admin && (
							<>
								<SidebarItem
									icon={<People />}
									text={"Manage User"}
									url={"/users"}
								/>
								<SidebarItem
									icon={<LocalShipping />}
									text={"Order History"}
									url={"/order-history"}
								/>
							</>
						)}
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
};
