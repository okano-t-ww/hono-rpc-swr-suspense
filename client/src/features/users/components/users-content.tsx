import { useUsers } from "../hooks/use-users";
import { UserList } from "./user-list";

interface Props {
	page: number;
	limit: number;
}

export function UsersContent({ page, limit }: Props) {
	const { data } = useUsers({ page, limit });
	return <UserList users={data.users} total={data.total} />;
}
