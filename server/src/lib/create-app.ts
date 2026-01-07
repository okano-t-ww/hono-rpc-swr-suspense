import { OpenAPIHono } from "@hono/zod-openapi";
import type { BaseErrorResponse } from "../schemas/error";

/**
 * Creates an OpenAPIHono instance with RFC 9457 compliant defaultHook
 * Use this factory for all routers to centralize validation error handling
 */
export const createApp = () => {
	return new OpenAPIHono({
		defaultHook: (result, c) => {
			if (!result.success) {
				return c.json(
					{
						type: "about:blank",
						title: "Validation failed",
						status: 422,
						detail: "Request validation failed",
						errors: result.error.issues,
					} satisfies BaseErrorResponse,
					422,
				);
			}
		},
	});
};
