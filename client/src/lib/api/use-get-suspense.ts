import type { ClientResponse, InferResponseType } from "hono/client";
import type { StatusCode, SuccessStatusCode } from "hono/utils/http-status";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import { honoFetcher } from "./fetcher";

type SuccessResponseType<T> = InferResponseType<T, SuccessStatusCode>;

export function useGetSuspenseWithKey<
	T extends () => Promise<ClientResponse<unknown, StatusCode, string>>,
>(
	key: string | readonly unknown[],
	fetcher: T,
	config?: Omit<SWRConfiguration<SuccessResponseType<T>>, "suspense">,
) {
	return useSWR<SuccessResponseType<T>>(key, () => honoFetcher(fetcher), {
		...config,
		suspense: true,
	});
}
