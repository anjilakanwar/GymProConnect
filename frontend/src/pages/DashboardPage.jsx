import { useEffect } from "react";
import { useAuth } from "../context/AuthUser";

export const Dashboard = () => {
	const { userData } = useAuth();

	useEffect(() => {
		document.title = "Dashboard";
	});

	console.log("Dashboard");

	return (
		<>
			<title>Dashboard</title>
			<p>Welcome! {userData.username} </p>
		</>
	);
};
