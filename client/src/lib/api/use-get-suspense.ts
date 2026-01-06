import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import { type HonoClientFn, honoFetcher } from "./fetcher";

export function useGetSuspense<T>(
	key: string | readonly unknown[],
	fetcher: HonoClientFn<T>,
	config?: Omit<SWRConfiguration<T>, "suspense">,
) {
	return useSWR<T>(key, () => honoFetcher(fetcher), {
		...config,
		suspense: true,
	});
}
