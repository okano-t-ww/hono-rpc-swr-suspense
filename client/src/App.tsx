import { ErrorTypeTest, UsersSuspenseSection } from "./features/users";

export default function App() {
	return (
		<main>
			<h1>Hono RPC + SWR Suspense Example</h1>
			<UsersSuspenseSection page={1} limit={20} />
			<hr />
			<h2>Error Type Test</h2>
			<ErrorTypeTest />
		</main>
	);
}
