import type { ClientResponse, InferResponseType } from "hono/client";
import { DetailedError, parseResponse } from "hono/client";
import type {
	ClientErrorStatusCode,
	ServerErrorStatusCode,
	StatusCode,
	SuccessStatusCode,
} from "hono/utils/http-status";

/**
 * Typed error class extending DetailedError with generic type parameter
 * Extracts RFC 9457 error data from DetailedError.detail.data
 */
export class TypedDetailedError<T> extends DetailedError {
	readonly data: T;

	constructor(detailedError: DetailedError) {
		super(detailedError.message);
		this.name = "TypedDetailedError";
		this.detail = detailedError.detail;
		this.code = detailedError.code;
		this.statusCode = detailedError.statusCode;
		this.log = detailedError.log;
		this.data = detailedError.detail?.data as T;
	}
}

/** Generic constraint type for Hono RPC client functions */
export type HonoClientFnGeneric = () => Promise<
	ClientResponse<
		unknown, // NOTE: Actual types are extracted via InferSuccessResponse/InferErrorResponse
		StatusCode,
		string
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
 * - On 4xx/5xx responses, throws TypedDetailedError with RFC 9457 data
 */
export async function honoFetcher<T extends HonoClientFnGeneric>(
	fn: T,
): Promise<InferSuccessResponse<T>> {
	try {
		// NOTE: Type assertion: parseResponse returns the same type but via different conditional type paths
		return (await parseResponse(fn())) as InferSuccessResponse<T>;
	} catch (error) {
		if (error instanceof DetailedError) {
			throw new TypedDetailedError<InferErrorResponse<T>>(error);
		}
		throw error;
	}
}
