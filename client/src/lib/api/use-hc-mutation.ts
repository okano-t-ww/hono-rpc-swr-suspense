import type { InferRequestType } from "hono/client";
import useSWRMutation, { type SWRMutationConfiguration } from "swr/mutation";
import {
	type HonoClientFetcherFnWithArgs,
	honoFetcher,
	type InferErrorResponse,
	type InferSuccessResponse,
	type TypedDetailedError,
} from "./fetcher";

/**
 * SWR Mutation hook for Hono RPC client
 *
 * @param key - Cache key for the mutation
 * @param clientFn - Hono RPC client method (e.g., client.users.$post)
 * @param config - SWR Mutation configuration
 *
 * @example
 * ```typescript
 * const { trigger, isMutating } = useHcMutation(
 *   "createUser",
 *   client.users.$post,
 * );
 *
 * await trigger({ json: { name: "Alice", email: "alice@example.com" } });
 * ```
 */
export function useHcMutation<TClientFn extends HonoClientFetcherFnWithArgs>(
	key: string | readonly unknown[],
	clientFn: TClientFn,
	config?: SWRMutationConfiguration<
		InferSuccessResponse<TClientFn>,
		TypedDetailedError<InferErrorResponse<TClientFn>>,
		typeof key,
		InferRequestType<TClientFn>
	>,
) {
	return useSWRMutation<
		InferSuccessResponse<TClientFn>,
		TypedDetailedError<InferErrorResponse<TClientFn>>,
		typeof key,
		InferRequestType<TClientFn>
	>(
		key,
		(_: typeof key, { arg }: { arg: InferRequestType<TClientFn> }) =>
			honoFetcher(() => clientFn(arg)) as Promise<
				InferSuccessResponse<TClientFn>
			>,
		config,
	);
}
