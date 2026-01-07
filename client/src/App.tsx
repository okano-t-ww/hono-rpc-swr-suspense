import { CreateUserForm, UsersSection } from "./features/users";

export default function App() {
	return (
		<main style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
			<h1>Hono RPC + SWR Example</h1>

			<section style={{ marginBottom: "2rem" }}>
				<h2>Users List</h2>
				<UsersSection />
			</section>

			<hr />

			<section style={{ marginBottom: "2rem" }}>
				<h2>Create User</h2>
				<p style={{ color: "#666", fontSize: "0.9rem" }}>
					100文字超のnameや不正なemailでバリデーションエラー (422) を再現できます。
				</p>
				<CreateUserForm />
			</section>
		</main>
	);
}
