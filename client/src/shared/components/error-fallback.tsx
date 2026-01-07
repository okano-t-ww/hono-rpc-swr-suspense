import { TypedDetailedError } from "@/lib/api/fetcher";

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) {
	const isTypedError = error instanceof TypedDetailedError;

	return (
		<div
			role="alert"
			style={{
				border: "2px solid #f44336",
				borderRadius: "8px",
				padding: "1rem",
				background: "#ffebee",
			}}
		>
			<h3 style={{ margin: "0 0 0.5rem 0", color: "#c62828" }}>
				{isTypedError ? error.data?.title : "Error"}
			</h3>
			{isTypedError && error.data?.status && (
				<p style={{ margin: "0 0 0.5rem 0" }}>
					<strong>Status:</strong> {error.data.status}
				</p>
			)}
			{isTypedError && error.data?.detail && (
				<p style={{ margin: "0 0 0.5rem 0" }}>
					<strong>Detail:</strong> {error.data.detail}
				</p>
			)}
			<pre
				style={{
					background: "#fff",
					padding: "0.75rem",
					borderRadius: "4px",
					overflow: "auto",
					fontSize: "0.85rem",
					margin: "0.5rem 0",
				}}
			>
				{isTypedError
					? JSON.stringify(error.data, null, 2)
					: error.message}
			</pre>
			<button
				type="button"
				onClick={resetErrorBoundary}
				style={{
					padding: "0.5rem 1rem",
					cursor: "pointer",
					background: "#f44336",
					color: "#fff",
					border: "none",
					borderRadius: "4px",
				}}
			>
				再試行
			</button>
		</div>
	);
}
