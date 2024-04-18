// import { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { TablePagination } from "@mui/material";
// import Paper from "@mui/material/Paper";

// import { useAuth } from "../../context/AuthUser";
// import axiosInstance from "../../utils/axiosInstance";

// export function PurchaseLog() {
// 	const { userData } = useAuth();
// 	const [transactionLogs, setTranscationLogs] = useState(null);

// 	useEffect(() => {
// 		document.title = "Equipments";

// 		const fetchEquipmentData = async () => {
// 			await axiosInstance(userData.token)
// 				.get("purchaselog/")
// 				.then((res) => {
// 					setTranscationLogs(res.data.results);
// 				});
// 		};

// 		fetchEquipmentData();
// 	}, [userData]);

// 	return (
// 		<>
// 			{transactionLogs && (
// 				<TableContainer component={Paper}>
// 					<Table sx={{ minWidth: 650 }} aria-label="simple table">
// 						<TableHead>
// 							<TableRow>
// 								<TableCell>ID</TableCell>
// 								<TableCell align="right">Date</TableCell>
// 								<TableCell align="right">Price</TableCell>
// 								<TableCell align="right">Quantity</TableCell>
// 								<TableCell align="right">
// 									Equipment ID
// 								</TableCell>
// 								<TableCell align="right">Supplier ID</TableCell>
// 								<TableCell align="right">
// 									Transcation ID
// 								</TableCell>
// 								<TableCell align="right">Remarks</TableCell>
// 							</TableRow>
// 						</TableHead>
// 						<TableBody>
// 							{transactionLogs.map((row) => (
// 								<TableRow
// 									key={row.id}
// 									sx={{
// 										"&:last-child td, &:last-child th": {
// 											border: 0,
// 										},
// 									}}
// 								>
// 									<TableCell component="th" scope="row">
// 										{row.name}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.purchase_date}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.purchase_price}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.quantity}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.equipment_id}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.supplier_id}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.transcation_id_id}
// 									</TableCell>
// 									<TableCell align="right">
// 										{row.remarks}
// 									</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 					<TablePagination rowsPerPageOptions={[10, 50]} />
// 				</TableContainer>
// 			)}
// 		</>
// 	);
// }
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthUser";

export function PurchaseLog() {
	const { userData } = useAuth();

	const [purchaseLogs, setPurchaseLogs] = useState(null);

	useEffect(() => {
		document.title = "Purchase Log";

		const fetchEquipmentData = async () => {
			await axiosInstance(userData.token)
				.get("purchaselog/")
				.then((res) => {
					setPurchaseLogs(res.data.results);
				});
		};

		fetchEquipmentData();
	}, [userData]);

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Purchase Date</TableCell>
							<TableCell>Purchase Price</TableCell>
							<TableCell>Transaction ID</TableCell>
							<TableCell>Supplier ID</TableCell>
							<TableCell>Equipment ID</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Remarks</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{purchaseLogs &&
							purchaseLogs.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.purchase_date}
									</TableCell>
									<TableCell align="right">
										{row.purchase_price}
									</TableCell>
									<TableCell align="right">
										{row.transcation_id}
									</TableCell>
									<TableCell align="right">
										{row.supplier_id}
									</TableCell>
									<TableCell align="right">
										{row.equipment_id}
									</TableCell>
									<TableCell align="right">
										{row.quantity}
									</TableCell>
									<TableCell align="right">
										{row.remarks}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
