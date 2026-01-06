import type { ClientResponse } from "hono/client";
import { parseResponse } from "hono/client";
import type { StatusCode } from "hono/utils/http-status";

/** Hono RPC client function type that returns JSON response */
export type HonoClientFn<T> = () => Promise<
	ClientResponse<T, StatusCode, "json">
>;

/**
 * Hono RPC client response fetcher
 *
 * - Parses response and extracts typed data
 * - Throws DetailedError on 4xx/5xx responses
 */
export async function honoFetcher<T>(fn: HonoClientFn<T>): Promise<T> {
	return parseResponse(fn());
}
