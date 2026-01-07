import { useSWRConfig } from "swr";
import { client, useHcMutation } from "@/lib/api";

export function useCreateUser() {
	const { mutate } = useSWRConfig();

	return useHcMutation("createUser", client.users.$post, {
		onSuccess: () => {
			// Invalidate users cache after successful creation
			mutate((key) => Array.isArray(key) && key[0] === "users");
		},
		onError: (error) => {
			console.error("Error creating user:", error);
		},
	});
}
