import { useSWRConfig } from "swr";
import { client, useHcMutation } from "@/lib/api";

export function useCreateUser() {
	const { mutate } = useSWRConfig();

	const invalidateUsersCache = () => {
		mutate((key) => Array.isArray(key) && key[0] === "users", undefined, {
			revalidate: true,
		});
	};

	return {
		...useHcMutation("createUser", client.users.$post),
		invalidateUsersCache,
	};
}
