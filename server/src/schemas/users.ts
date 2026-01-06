import { z } from "@hono/zod-openapi";

export const getUsersQuerySchema = z
	.object({
		page: z.coerce.number().int().min(1).default(1),
		limit: z.coerce.number().int().min(1).max(100).default(20),
	})
	.openapi("GetUsersQuery");

export const userSchema = z
	.object({
		id: z.uuid({ version: "v4" }),
		name: z.string(),
		email: z.email(),
		createdAt: z.iso.datetime(),
	})
	.openapi("User");

export const getUsersResultSchema = z
	.object({
		users: z.array(userSchema),
		total: z.number(),
	})
	.openapi("GetUsersResult");

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type GetUsersResult = z.infer<typeof getUsersResultSchema>;
