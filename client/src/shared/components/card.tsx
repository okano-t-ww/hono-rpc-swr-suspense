import type { ReactNode } from "react";

interface CardProps {
	title: string;
	description?: string;
	variant?: "default" | "success" | "error" | "warning";
	children: ReactNode;
}

const variantStyles = {
	default: {
		border: "1px solid #e0e0e0",
		background: "#fff",
	},
	success: {
		border: "2px solid #4caf50",
		background: "#e8f5e9",
	},
	error: {
		border: "2px solid #f44336",
		background: "#ffebee",
	},
	warning: {
		border: "2px solid #ff9800",
		background: "#fff3e0",
	},
};

export function Card({
	title,
	description,
	variant = "default",
	children,
}: CardProps) {
	const styles = variantStyles[variant];

	return (
		<div
			style={{
				...styles,
				borderRadius: "8px",
				padding: "1rem",
				marginBottom: "1rem",
			}}
		>
			<h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{title}</h3>
			{description && (
				<p style={{ margin: "0 0 1rem 0", color: "#666", fontSize: "0.9rem" }}>
					{description}
				</p>
			)}
			{children}
		</div>
	);
}
