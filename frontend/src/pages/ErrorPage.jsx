import { useEffect } from "react";

export function Error() {
	useEffect(() => {
		document.title = "Error Page";
	});

	return (
		<>
			<div>Error Page</div>
		</>
	);
}
