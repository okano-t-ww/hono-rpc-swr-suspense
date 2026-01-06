import type { ClientResponse, InferResponseType } from "hono/client";
import { parseResponse } from "hono/client";
import type { StatusCode, SuccessStatusCode } from "hono/utils/http-status";

export async function honoFetcher<
	T extends () => Promise<ClientResponse<unknown, StatusCode, string>>,
>(fn: T): Promise<InferResponseType<T, SuccessStatusCode>> {
	return parseResponse(fn()) as Promise<
		InferResponseType<T, SuccessStatusCode>
	>;
}
