import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import {
	type HonoClientFnGeneric,
	honoFetcher,
	type InferErrorResponse,
	type InferSuccessResponse,
	type TypedDetailedError,
} from "./fetcher";

export function useHc<T extends HonoClientFnGeneric>(
	key: string | readonly unknown[],
	fetcher: T,
	config?: SWRConfiguration<InferSuccessResponse<T>>,
) {
	return useSWR<
		InferSuccessResponse<T>,
		TypedDetailedError<InferErrorResponse<T>>
	>(key, () => honoFetcher(fetcher), config);
}
