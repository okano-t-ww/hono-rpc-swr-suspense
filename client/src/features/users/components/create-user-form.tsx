import { type FormEvent, useState } from "react";
import { useCreateUser } from "../hooks/use-create-user";

export function CreateUserForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const { trigger, isMutating, error } = useCreateUser();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await trigger(
			{ json: { name, email } },
			{
				onSuccess: () => {
					setName("");
					setEmail("");
				},
				onError: (error) => {
					console.error("Error creating user:", error);
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div style={{ marginBottom: "8px" }}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={isMutating}
						style={{ marginLeft: "8px" }}
					/>
				</label>
			</div>
			<div style={{ marginBottom: "8px" }}>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						disabled={isMutating}
						style={{ marginLeft: "8px" }}
					/>
				</label>
			</div>
			<button type="submit" disabled={isMutating}>
				{isMutating ? "Creating..." : "Create User"}
			</button>
			{error && (
				<div style={{ color: "red", marginTop: "8px" }}>
					<strong>Error:</strong> {error.data.title ?? error.message}
					{error.data.errors && (
						<ul>
							{error.data.errors.map((err) => (
								<li key={err?.toString()}>{JSON.stringify(err)}</li>
							))}
						</ul>
					)}
				</div>
			)}
		</form>
	);
}
