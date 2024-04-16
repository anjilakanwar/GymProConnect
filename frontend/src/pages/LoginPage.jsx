import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthUser";

import "../assets/css/index.css";
import { Divider } from "@mui/material";

export function Login() {
	let { userData, login } = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post("http://localhost:8000/accounts/login/", {
				username: formData.username,
				password: formData.password,
			})
			.then((res) => login(res.data));
	};

	useEffect(() => {
		document.title = "Login";
	});

	return userData ? (
		<Navigate to={"/dashboard"} />
	) : (
		<>
			<div className="h-screen flex items-center justify-center bg-slate-100">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleSubmit}
				>
					<div className="text-center mb-4">Welcome Back!</div>
					<Divider orientation="horizontal" />

					<div className="mb-4 mt-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
							name="password"
							onChange={handleChange}
						/>
					</div>
					<Divider orientation="horizontal" />

					<div className="flex items-center justify-between mt-4">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Sign In
						</button>
						<a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</>
	);
}
