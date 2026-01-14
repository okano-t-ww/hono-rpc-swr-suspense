import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import {
	type HonoClientFetcherFn,
	honoFetcher,
	type InferErrorResponse,
	type InferSuccessResponse,
	type TypedDetailedError,
} from "./fetcher";

export function useHcSuspense<T extends HonoClientFetcherFn>(
	key: string | readonly unknown[],
	fetcher: T,
	config?: Omit<SWRConfiguration<InferSuccessResponse<T>>, "suspense">,
) {
	return useSWR<
		InferSuccessResponse<T>,
		TypedDetailedError<InferErrorResponse<T>>,
		SWRConfiguration<InferSuccessResponse<T>> & { suspense: true }
	>(key, () => honoFetcher(fetcher), {
		...config,
		suspense: true,
	});
}
