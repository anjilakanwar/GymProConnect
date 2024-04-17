import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/img/logo.png";
import { Divider } from "@mui/material";
import { MainLayoutContext } from "../context/MainLayout";

export default function Sidebar({ children }) {
	const { expanded } = useContext(MainLayoutContext);

	return (
		<aside className="h-screen">
			<nav className="h-full flex flex-col bg-white border-r shadow-sm">
				<div className="p-4 flex justify-center items-center text-center">
					<img
						src={Logo}
						className={`overflow-hidden transition-all ${
							expanded ? "w-32" : "w-0"
						}`}
						alt="Logo"
					/>
				</div>

				{expanded && <Divider variant="middle" />}

				<ul className="flex-1 px-3">{children}</ul>
			</nav>
		</aside>
	);
}

export function SidebarItem({ icon, text, active, alert, url }) {
	const navigate = useNavigate();
	const { expanded } = useContext(MainLayoutContext);

	const handleNavigate = () => {
		navigate(url);
	};

	return (
		<li
			className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
				active
					? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
					: "hover:bg-indigo-50 text-gray-600"
			}
            `}
			onClick={handleNavigate}
		>
			{icon}
			<span
				className={`overflow-hidden transition-all ${
					expanded ? "w-28 m-1" : "w-0"
				}`}
			>
				{expanded ? text : null}
			</span>
			{alert && (
				<div
					className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
						expanded ? "" : "top-2"
					}`}
				/>
			)}

			{!expanded && (
				<div
					className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
					bg-opacity-20
                    `}
				>
					{text}
				</div>
			)}
		</li>
	);
}
