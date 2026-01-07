import type { GetUsersQuery } from "server/src/schemas/users.schema";
import { client, useHcSuspense } from "@/lib/api";

export function useUsersSuspense({ page, limit }: GetUsersQuery) {
	const { data } = useHcSuspense(["users", page, limit], () =>
		client.users.$get({ query: { page, limit } }),
	);

	// biome-ignore lint/style/noNonNullAssertion: Suspense mode guarantees data is defined
	return { data: data! };
}
