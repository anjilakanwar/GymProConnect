import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, Close } from "@mui/icons-material";

import { useAuth } from "../../context/AuthUser";
import axiosInstance from "../../utils/axiosInstance";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	IconButton,
	TextField,
	FormControl,
} from "@mui/material";

export function Supplier() {
	const { userData } = useAuth();
	const [suppliersData, setSuppliersData] = useState(null);

	const [showForm, setShowForm] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const [formData, setFormData] = useState({
		supplier_code: "",
		name: "",
		contact_info: "",
		address: "",
		email: "",
	});

	useEffect(() => {
		document.title = "Suppliers";

		const fetchSuppliers = async () => {
			await axiosInstance(userData.token)
				.get("supplier/")
				.then((res) => {
					setSuppliersData(res.data.results);
				});
		};

		fetchSuppliers();
	}, [userData]);

	const onFormDataChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axiosInstance(userData.token)
			.post("supplier/", formData)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = async (id) => {
		await axiosInstance(userData.token)
			.delete(`supplier/${id}/`)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleEdit = async () => {
		await axiosInstance(userData.token)
			.put(`supplier/${formData.supplier_id}/`, formData)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const openEditDialog = (id) => {
		setFormData(suppliersData.find((e) => e.supplier_id == id));
		setIsEditing(true);
		setShowForm(true);
	};

	const openAddDialog = () => {
		setFormData({
			supplier_code: "",
			name: "",
			contact_info: "",
			address: "",
			email: "",
		});
		setIsEditing(false);
		setShowForm(true);
	};

	return (
		<>
			{showForm && (
				<Dialog open={showForm}>
					<DialogTitle>Add Supplier</DialogTitle>
					<IconButton
						aria-label="close"
						onClick={() => setShowForm(false)}
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
						<FormControl fullWidth>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Supplier Name"
								type="text"
								size="small"
								onChange={onFormDataChange}
								value={formData.name}
								fullWidth
							/>
							<TextField
								autoFocus
								margin="dense"
								id="supplier_code"
								label="Unique Supplier Code"
								type="text"
								size="small"
								onChange={onFormDataChange}
								value={formData.supplier_code}
								fullWidth
							/>
							<TextField
								autoFocus
								margin="dense"
								id="contact_info"
								label="Phone Number"
								type="number"
								size="small"
								onChange={onFormDataChange}
								value={formData.contact_info}
								fullWidth
							/>
							<TextField
								autoFocus
								margin="dense"
								id="email"
								label="Email"
								type="email"
								size="small"
								onChange={onFormDataChange}
								value={formData.email}
								fullWidth
							/>

							<TextField
								autoFocus
								margin="dense"
								id="address"
								label="Address"
								type="text"
								size="small"
								onChange={onFormDataChange}
								value={formData.address}
								fullWidth
							/>

							<DialogActions>
								<Button
									onClick={() => setShowForm(false)}
									color="secondary"
								>
									Cancel
								</Button>

								<Button
									onClick={
										isEditing ? handleEdit : handleSubmit
									}
									color="primary"
								>
									Submit
								</Button>
							</DialogActions>
						</FormControl>
					</DialogContent>
				</Dialog>
			)}
			<TableContainer component={Paper} className="mb-4">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Supplier Name</TableCell>
							<TableCell align="right">Supplier Code</TableCell>
							<TableCell align="right">Contact Info</TableCell>
							<TableCell align="right">Email</TableCell>
							<TableCell align="right">Address</TableCell>
							<TableCell align="center">Operations</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{suppliersData &&
							suppliersData.map((row) => (
								<TableRow
									key={row.supplier_id}
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
										{row.supplier_code}
									</TableCell>
									<TableCell align="right">
										{row.contact_info}
									</TableCell>
									<TableCell align="right">
										{row.email}
									</TableCell>
									<TableCell align="right">
										{row.address}
									</TableCell>
									<TableCell align="center">
										<Button
											onClick={() =>
												openEditDialog(row.supplier_id)
											}
										>
											Edit
										</Button>{" "}
										|
										<Button
											onClick={() =>
												handleDelete(row.supplier_id)
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
			<Button
				variant="outlined"
				size="small"
				startIcon={<Add />}
				onClick={openAddDialog}
			>
				Add Supplier
			</Button>
		</>
	);
}
