import { client, useHc } from "@/lib/api";

/**
 * エラー型の検証用コンポーネント
 * 存在しないページ(page=999)をリクエストして404エラーを発生させる
 */
export function ErrorTypeTest() {
	const { data, error, isLoading } = useHc(["users-error-test", 999, 1], () =>
		client.users.$get({ query: { page: 999, limit: 1 } }),
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		console.log("=== Error Type Test ===");
		console.log("error:", error);
		console.log("error.data:", error.data);

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
