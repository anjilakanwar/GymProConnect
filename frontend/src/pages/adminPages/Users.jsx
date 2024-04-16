import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useAuth } from "../../context/AuthUser";

export function Users() {
	const { userData } = useAuth();
	const [usersData, setUsersData] = useState(null);

	useEffect(() => {
		document.title = "Equipments";

		const axiosInstance = axios.create({
			baseURL: "http://127.0.0.1:8000/",
			headers: {
				Authorization: `Token ${userData.token}`,
			},
		});

		const fetchEquipmentData = async () => {
			await axiosInstance.get("accounts/users/").then((res) => {
				setUsersData(res.data.results);
			});
		};

		fetchEquipmentData();
	}, [userData]);

	return (
		<>
			{usersData && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell align="right">Username</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Date Joined</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{usersData.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.username}
									</TableCell>
									<TableCell align="right">
										{row.first_name}
									</TableCell>
									<TableCell align="right">
										{row.last_name}
									</TableCell>
									<TableCell align="right">
										{row.email}
									</TableCell>
									<TableCell align="right">
										{row.date_joined}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
}
