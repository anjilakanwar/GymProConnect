import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { App } from "./App";
import { AuthUserProvider } from "./context/AuthUser";

import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthUserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthUserProvider>
	</React.StrictMode>
);
