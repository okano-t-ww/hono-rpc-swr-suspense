import type { GetUsersQuery } from "server/src/schemas/users";
import { client, useGetSuspense } from "@/lib/api";

export function useUsers({ page, limit }: GetUsersQuery) {
	const { data } = useGetSuspense(["users", page, limit], () =>
		client.users.$get({ query: { page, limit } }),
	);

	// biome-ignore lint/style/noNonNullAssertion: Suspense mode guarantees data is defined
	return { data: data! };
}
