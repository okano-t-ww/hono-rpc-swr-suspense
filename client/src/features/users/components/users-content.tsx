import { useUsersSuspense } from "../hooks/use-users-suspense";
import { UserList } from "./user-list";

interface Props {
	page: number;
	limit: number;
}

export function UsersContent({ page, limit }: Props) {
	const { data } = useUsersSuspense({ page, limit });
	return <UserList users={data.users} total={data.total} />;
}
