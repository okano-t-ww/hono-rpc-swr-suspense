import { z } from "@hono/zod-openapi";

/**
 * RFC 9457 (Problem Details for HTTP APIs) Base Schema
 * @see https://www.rfc-editor.org/rfc/rfc9457
 */
const baseErrorResponseSchema = z.object({
	type: z.string().default("about:blank"),
	title: z.string(),
	status: z.number(),
	detail: z.string().optional(),
	instance: z.string().optional(),
	errors: z.array(z.unknown()).optional(),
});

// 422 Unprocessable Entity
export const unprocessableEntityResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(422),
	})
	.openapi("UnprocessableEntityResponse");

// 400 Bad Request
export const badRequestResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(400),
	})
	.openapi("BadRequestResponse");

// 401 Unauthorized
export const unauthorizedResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(401),
	})
	.openapi("UnauthorizedResponse");

// 403 Forbidden
export const forbiddenResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(403),
	})
	.openapi("ForbiddenResponse");

// 404 Not Found
export const notFoundResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(404),
	})
	.openapi("NotFoundResponse");

// 500 Internal Server Error
export const internalServerErrorResponseSchema = baseErrorResponseSchema
	.extend({
		status: z.literal(500),
	})
	.openapi("InternalServerErrorResponse");

export type BaseErrorResponse = z.infer<typeof baseErrorResponseSchema>;
export type UnprocessableEntityResponse = z.infer<
	typeof unprocessableEntityResponseSchema
>;
export type BadRequestResponse = z.infer<typeof badRequestResponseSchema>;
export type UnauthorizedResponse = z.infer<typeof unauthorizedResponseSchema>;
export type ForbiddenResponse = z.infer<typeof forbiddenResponseSchema>;
export type NotFoundResponse = z.infer<typeof notFoundResponseSchema>;
export type InternalServerErrorResponse = z.infer<
	typeof internalServerErrorResponseSchema
>;
