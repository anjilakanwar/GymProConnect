import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	Button,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useAuth } from "../../context/AuthUser";

import axiosInstance from "../../utils/axiosInstance";

export function Users() {
	const { userData } = useAuth();
	const [usersData, setUsersData] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		phone_number: "",
		dob: "",
		address: "",
		role: "",
		is_staff: true,
	});

	const onFormDataChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	useEffect(() => {
		document.title = "Users";

		const fetchData = async () => {
			await axiosInstance(userData.token)
				.get("accounts/users/")
				.then((res) => {
					setUsersData(res.data);
				});
		};

		fetchData();
	}, [userData]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axiosInstance(userData.token)
			.post("accounts/users/", formData)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = async (id) => {
		await axiosInstance(userData.token)
			.delete(`accounts/users/${id}/`)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleEdit = async () => {
		await axiosInstance(userData.token)
			.put(`accounts/users/${formData.id}/`, formData)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const openAddDialog = () => {
		setFormData({
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			phone_number: "",
			dob: "",
			address: "",
			role: "",
			is_staff: true,
		});
		setIsEditing(false);
		setShowForm(true);
	};

	return (
		<>
			{showForm && (
				<Dialog open={showForm}>
					<DialogTitle>Order Equipment</DialogTitle>
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
						<form className="w-full max-w-lg">
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="first_name"
									>
										First Name
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 
										border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
										id="first_name"
										type="text"
										name="first_name"
										value={formData.first_name}
										onChange={onFormDataChange}
										placeholder="First Name"
										required
									/>
								</div>
								<div className="w-full md:w-1/2 px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="last_name"
									>
										Last Name
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border 
										border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
										focus:border-gray-500"
										id="last_name"
										type="text"
										placeholder="Last Name"
										name="last_name"
										value={formData.last_name}
										onChange={onFormDataChange}
									/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border 
										border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
										focus:border-gray-500"
										id="password"
										type="password"
										name="password"
										onChange={onFormDataChange}
										placeholder="******************"
									/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="username"
									>
										Username
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border 
										border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
										focus:border-gray-500"
										id="username"
										type="text"
										name="username"
										value={formData.username}
										onChange={onFormDataChange}
										placeholder="Username"
										maxLength={10}
									/>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
										rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="email"
										type="text"
										name="email"
										value={formData.email}
										onChange={onFormDataChange}
										placeholder="Email"
									/>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="phone_number"
									>
										Phone Number
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
										rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="phone_number"
										type="text"
										name="phone_number"
										value={formData.phone_number}
										onChange={onFormDataChange}
										placeholder="Phone Number"
										maxLength={10}
									/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-2">
								<div className="w-full px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="dob"
									>
										Date of Birth
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
										rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="dob"
										type="date"
										name="dob"
										value={formData.dob}
										onChange={onFormDataChange}
										placeholder="0000/00/00"
									/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-2">
								<div className="w-full px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="address"
									>
										Address
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
										rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="address"
										type="text"
										name="address"
										value={formData.address}
										onChange={onFormDataChange}
										placeholder="Address"
									/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-2">
								<div className="w-full px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="role"
									>
										Role
									</label>
									<select
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
										rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="role"
										name="role"
										value={formData.address}
										onChange={onFormDataChange}
									>
										<option
											id="s_manager"
											value="s_manager"
										>
											Sales Manager
										</option>
										<option
											id="receptionist"
											value="receptionist"
										>
											Receptionist
										</option>
										<option id="manager" value="manager">
											Manager
										</option>
									</select>
								</div>
							</div>
							<button
								className="shadow bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none 
								text-white font-bold py-2 px-4 rounded"
								type="button"
								onClick={isEditing ? handleEdit : handleSubmit}
							>
								Submit
							</button>
						</form>
					</DialogContent>
				</Dialog>
			)}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Full Name</TableCell>
							<TableCell align="center">Email</TableCell>
							<TableCell align="center">Role</TableCell>
							<TableCell align="center">Operation</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{usersData &&
							usersData.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell align="center">
										{row.full_name}
									</TableCell>
									<TableCell align="center">
										{row.email}
									</TableCell>
									<TableCell align="center">
										{row.role}
									</TableCell>
									<TableCell align="center">
										{userData.user_id == row.id ? null : (
											<Button
												onClick={() =>
													handleDelete(row.id)
												}
											>
												Delete
											</Button>
										)}
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
				Add User
			</Button>
		</>
	);
}
