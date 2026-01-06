import type { GetUsersQuery } from "server/src/schemas/users";
import { client, useGet } from "@/lib/api";

export function useUsers({ page, limit }: GetUsersQuery) {
	return useGet(["users", page, limit], () =>
		client.users.$get({ query: { page, limit } }),
	);
}
