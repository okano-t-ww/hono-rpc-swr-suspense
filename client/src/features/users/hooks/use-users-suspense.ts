import type { GetUsersQuery } from "server/src/schemas/users.schema";
import { client, useHcSuspense } from "@/lib/api";

export function useUsersSuspense({ page, limit }: GetUsersQuery) {
	const { data } = useHcSuspense(["users", page, limit], () =>
		client.users.$get({ query: { page, limit } }),
	);

	return { data: data };
}
