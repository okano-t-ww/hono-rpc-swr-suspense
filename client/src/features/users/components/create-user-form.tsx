import { type FormEvent, useState } from "react";
import { useCreateUser } from "../hooks/use-create-user";

const presets = {
	valid: {
		name: "Test User",
		email: "test@example.com",
		label: "✓ 正常",
	},
	invalidEmail: {
		name: "Test User",
		email: "invalid-email",
		label: "✗ 不正なEmail",
	},
	longName: {
		name: "A".repeat(101),
		email: "test@example.com",
		label: "✗ 101文字のName",
	},
} as const;

export function CreateUserForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const { trigger, isMutating, error, invalidateUsersCache } = useCreateUser();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await trigger(
			{ json: { name, email } },
			{
				onSuccess: () => {
					setName("");
					setEmail("");
					invalidateUsersCache();
				},
				onError: (error) => {
					console.error("Error creating user:", error);
				},
			},
		);
	};

	const applyPreset = (preset: keyof typeof presets) => {
		setName(presets[preset].name);
		setEmail(presets[preset].email);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div style={{ marginBottom: "1rem" }}>
				<span style={{ marginRight: "0.5rem", fontSize: "0.9rem" }}>
					プリセット:
				</span>
				{Object.entries(presets).map(([key, preset]) => (
					<button
						key={key}
						type="button"
						onClick={() => applyPreset(key as keyof typeof presets)}
						disabled={isMutating}
						style={{
							marginRight: "0.5rem",
							padding: "0.25rem 0.5rem",
							fontSize: "0.85rem",
							cursor: "pointer",
						}}
					>
						{preset.label}
					</button>
				))}
			</div>
			<div style={{ marginBottom: "8px" }}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={isMutating}
						style={{ marginLeft: "8px", width: "200px" }}
					/>
					{name.length > 100 && (
						<span
							style={{ color: "red", marginLeft: "8px", fontSize: "0.85rem" }}
						>
							({name.length}文字 - 100文字超過)
						</span>
					)}
				</label>
			</div>
			<div style={{ marginBottom: "8px" }}>
				<label>
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						disabled={isMutating}
						style={{ marginLeft: "8px", width: "200px" }}
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
								<li key={JSON.stringify(err)}>{JSON.stringify(err)}</li>
							))}
						</ul>
					)}
				</div>
			)}
		</form>
	);
}
