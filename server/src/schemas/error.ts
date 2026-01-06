import { z } from "@hono/zod-openapi";

export const apiErrorResponseSchema = z
	.object({
		message: z.string(),
		code: z.string(),
	})
	.openapi("ApiErrorResponse");

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
