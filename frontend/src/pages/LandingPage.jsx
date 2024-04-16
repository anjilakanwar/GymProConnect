import { useEffect } from "react";

export function Landing() {
	useEffect(() => {
		document.title = "Landing Page";
	});

	return (
		<>
			<div>Landing</div>
		</>
	);
}
