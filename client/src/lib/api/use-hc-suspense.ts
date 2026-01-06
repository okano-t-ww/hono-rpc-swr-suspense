import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import {
	type HonoClientFnGeneric,
	honoFetcher,
	type InferErrorResponse,
	type InferSuccessResponse,
} from "./fetcher";

export function useHcSuspense<T extends HonoClientFnGeneric>(
	key: string | readonly unknown[],
	fetcher: T,
	config?: Omit<SWRConfiguration<InferSuccessResponse<T>>, "suspense">,
) {
	return useSWR<InferSuccessResponse<T>, InferErrorResponse<T>>(
		key,
		() => honoFetcher(fetcher),
		{
			...config,
			suspense: true,
		},
	);
}
