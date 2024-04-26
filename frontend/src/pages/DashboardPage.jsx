import { useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useAuth } from "../context/AuthUser";

function AppWidgetSummary({
	title,
	total,
	icon,
	color = "primary",
	sx,
	...other
}) {
	return (
		<Card
			component={Stack}
			spacing={3}
			direction="row"
			sx={{
				px: 3,
				py: 5,
				borderRadius: 2,
				...sx,
			}}
			{...other}
		>
			{icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

			<Stack spacing={0.5}>
				<Typography variant="h4">{total}</Typography>

				<Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
					{title}
				</Typography>
			</Stack>
		</Card>
	);
}

export const Dashboard = () => {
	const { userData } = useAuth();

	useEffect(() => {
		document.title = "Dashboard";
	});

	console.log("Dashboard");

	return (
		<Container maxWidth="xl">
			<Typography variant="h4" sx={{ mb: 5 }}>
				Hi, Welcome back {userData.username} 👋
			</Typography>
			<Grid container spacing={3}>
				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title="Weekly Sales"
						total={714000}
						color="success"
						icon={
							<img
								alt="icon"
								src="/assets/icons/glass/ic_glass_bag.png"
							/>
						}
					/>
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title="New Users"
						total={1352831}
						color="info"
						icon={
							<img
								alt="icon"
								src="/assets/icons/glass/ic_glass_users.png"
							/>
						}
					/>
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title="Item Orders"
						total={1723315}
						color="warning"
						icon={
							<img
								alt="icon"
								src="/assets/icons/glass/ic_glass_buy.png"
							/>
						}
					/>
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title="Bug Reports"
						total={234}
						color="error"
						icon={
							<img
								alt="icon"
								src="/assets/icons/glass/ic_glass_message.png"
							/>
						}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};
