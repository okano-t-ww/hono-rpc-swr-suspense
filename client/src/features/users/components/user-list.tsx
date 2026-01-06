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
			<p>Total: {total} users</p>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<strong>{user.name}</strong> - {user.email}
						<br />
						<small>
							Created: {new Date(user.createdAt).toLocaleDateString()}
						</small>
					</li>
				))}
			</ul>
		</div>
	);
}
