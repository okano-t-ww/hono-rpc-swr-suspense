import { useUsers } from "../hooks/use-users";

export function ErrorTypeTest() {
	const { data, error, isLoading } = useUsers({ page: -1, limit: 10 });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div style={{ border: "2px solid red", padding: "1rem", margin: "1rem" }}>
				<h3>Error Type Test Result</h3>
				<p>
					<strong>Title:</strong> {error.data.title}
				</p>
				<p>
					<strong>Status:</strong> {error.data.status}
				</p>
				<pre style={{ background: "#f5f5f5", padding: "1rem" }}>
					{JSON.stringify(error.data, null, 2)}
				</pre>
			</div>
		);
	}

	return (
		<div>
			<p>Data received (unexpected): {JSON.stringify(data)}</p>
		</div>
	);
}
