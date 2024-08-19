import TldrawComponent from "@/components/TldrawComponent";

export default function App() {
	return (
		<div
			style={{
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
			}}
		>
			<h1>Tldraw Canvas</h1>
			<TldrawComponent />
		</div>
	);
}
