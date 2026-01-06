import type { ClientResponse, InferResponseType } from "hono/client";
import { parseResponse } from "hono/client";
import type {
	ClientErrorStatusCode,
	ServerErrorStatusCode,
	StatusCode,
	SuccessStatusCode,
} from "hono/utils/http-status";

/** Hono RPC client function type that returns JSON response */
export type HonoClientFn<
	TSuccess = unknown,
	TError = unknown,
	TStatus extends StatusCode = StatusCode,
> = () => Promise<ClientResponse<TSuccess | TError, TStatus, "json">>;

/** Generic constraint type for Hono RPC client functions */
export type HonoClientFnGeneric = () => Promise<
	ClientResponse<
		unknown, // NOTE: Actual types are extracted via InferSuccessResponse/InferErrorResponse
		StatusCode,
		"json" // NOTE: Required literal type for parseResponse type inference
	>
>;

/** Extract success response type (2xx) from Hono client function */
export type InferSuccessResponse<T> = InferResponseType<T, SuccessStatusCode>;

/** Extract error response type (4xx | 5xx) from Hono client function */
export type InferErrorResponse<T> = InferResponseType<
	T,
	ClientErrorStatusCode | ServerErrorStatusCode
>;

/**
 * Hono RPC client response fetcher
 *
 * - Parses response and extracts typed data
 * - Throws DetailedError on 4xx/5xx responses
 */
export async function honoFetcher<T extends HonoClientFnGeneric>(
	fn: T,
): Promise<InferSuccessResponse<T>> {
	// NOTE: Type assertion: parseResponse returns the same type but via different conditional type paths
	return parseResponse(fn()) as Promise<InferSuccessResponse<T>>;
}
