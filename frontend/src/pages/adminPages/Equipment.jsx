import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Close, ShoppingCart } from "@mui/icons-material";

import { useAuth } from "../../context/AuthUser";
import axiosInstance from "../../utils/axiosInstance";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	IconButton,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

export function Equipments() {
	const { userData } = useAuth();
	const [equipmentData, setEquipmentData] = useState(null);
	const [suppliersData, setSuppliersData] = useState(null);

	const [showOrderForm, setShowOrderForm] = useState(null);
	const [hasSuppliers, setHasSuppliers] = useState(null);

	const [formData, setFormData] = useState({ name: "" });

	useEffect(() => {
		document.title = "Equipments";

		const fetchEquipmentData = async () => {
			await axiosInstance(userData.token)
				.get("equipment/")
				.then((res) => {
					setEquipmentData(res.data.results);
				});
		};

		const fetchSuppliers = async () => {
			await axiosInstance(userData.token)
				.get("supplier/")
				.then((res) => {
					setSuppliersData(res.data.results);
					setHasSuppliers(true);
				});
		};

		fetchEquipmentData();
		fetchSuppliers();
	}, [userData]);

	const onFormDataChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = () => {
		console.log(formData);
	};

	return (
		<>
			{showOrderForm && (
				<Dialog open={showOrderForm}>
					<DialogTitle>Order Equipment</DialogTitle>
					<IconButton
						aria-label="close"
						onClick={() => setShowOrderForm(false)}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<Close />
					</IconButton>
					<DialogContent
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							columnGap: 10,
						}}
					>
						<TextField
							autoFocus
							margin="dense"
							id="equipmentName"
							label="Equipment Name"
							type="text"
							size="small"
							onChange={onFormDataChange}
						/>
						<TextField
							autoFocus
							margin="dense"
							id="count"
							label="Count"
							type="text"
							size="small"
							onChange={onFormDataChange}
						/>

						<Select
							name="supplier"
							label="Suppliers"
							size="small"
							value={formData.name}
							margin="dense"
							fullWidth
							onChange={onFormDataChange}
							disabled={hasSuppliers ? false : true}
						>
							{suppliersData &&
								suppliersData.map((row) => (
									<MenuItem
										key={row.supplier_code}
										value={row.supplier_code}
									>
										{row.name}
									</MenuItem>
								))}
						</Select>

						<DialogActions>
							<Button
								onClick={() => setShowOrderForm(false)}
								color="secondary"
							>
								Cancel
							</Button>
							<Button onClick={handleSubmit} color="primary">
								Submit
							</Button>
						</DialogActions>
					</DialogContent>
				</Dialog>
			)}
			<TableContainer component={Paper} className="mb-4">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Equipment Type</TableCell>
							<TableCell align="right">Manufracturer</TableCell>
							<TableCell align="right">Count</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{equipmentData &&
							equipmentData.map((row) => (
								<TableRow
									key={row.equipment_id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">
										{row.equipment_type}
									</TableCell>
									<TableCell align="right">
										{row.manufracturer}
									</TableCell>
									<TableCell align="right">
										{row.count}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				variant="outlined"
				size="small"
				startIcon={<ShoppingCart />}
				onClick={() => setShowOrderForm(true)}
			>
				Order Equipment
			</Button>
		</>
	);
}
