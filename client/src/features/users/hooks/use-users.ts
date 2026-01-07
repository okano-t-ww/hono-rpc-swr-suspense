import type { GetUsersQuery } from "server/src/schemas/users.schema";
import { client, useHc } from "@/lib/api";

export function useUsers({ page, limit }: GetUsersQuery) {
	return useHc(["users", page, limit], () =>
		client.users.$get({ query: { page, limit } }),
	);
}
