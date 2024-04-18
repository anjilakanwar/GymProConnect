import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAuth } from "../../context/AuthUser";
import axiosInstance from "../../utils/axiosInstance";
import { Button } from "@mui/material";

export function OrderHistory() {
	const { userData } = useAuth();
	const [orderData, setOrderData] = useState(null);

	useEffect(() => {
		document.title = "Order History";

		const fetchOrdersData = async () => {
			await axiosInstance(userData.token)
				.get("orderhistory/")
				.then((res) => {
					setOrderData(res.data.results);
				});
		};

		fetchOrdersData();
	}, [userData]);

	const handleDelete = async (id) => {
		await axiosInstance(userData.token)
			.delete(`orderhistory/${id}/`)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<TableContainer component={Paper} className="mb-4">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Order ID</TableCell>
							<TableCell align="right">Order Date</TableCell>
							<TableCell align="right">Item Name</TableCell>
							<TableCell align="right">Count</TableCell>
							<TableCell align="center">Supplier ID</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orderData &&
							orderData.map((row) => (
								<TableRow
									key={row.order_id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.order_date}
									</TableCell>
									<TableCell align="right">
										{row.item_name}
									</TableCell>
									<TableCell align="right">
										{row.count}
									</TableCell>
									<TableCell align="right">
										{row.supplier}
									</TableCell>
									<TableCell align="center">
										<Button
											onClick={() =>
												handleDelete(row.order_id)
											}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
