interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps) {
	return (
		<div role="alert">
			<p>データの取得に失敗しました</p>
			<pre>{error.message}</pre>
			<button type="button" onClick={resetErrorBoundary}>
				再試行
			</button>
		</div>
	);
}
