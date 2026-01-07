interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

interface UserListProps {
	users: User[];
	total: number;
}

export function UserList({ users, total }: UserListProps) {
	return (
		<div>
			<p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#666" }}>
				{total} users
			</p>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					fontSize: "0.9rem",
				}}
			>
				<thead>
					<tr style={{ borderBottom: "2px solid #e0e0e0" }}>
						<th style={{ textAlign: "left", padding: "0.5rem" }}>Name</th>
						<th style={{ textAlign: "left", padding: "0.5rem" }}>Email</th>
						<th style={{ textAlign: "left", padding: "0.5rem" }}>Created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} style={{ borderBottom: "1px solid #e0e0e0" }}>
							<td style={{ padding: "0.5rem" }}>{user.name}</td>
							<td style={{ padding: "0.5rem" }}>{user.email}</td>
							<td style={{ padding: "0.5rem" }}>
								{new Date(user.createdAt).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
