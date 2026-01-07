import { createRoute } from "@hono/zod-openapi";
import { createHono } from "../lib/create-hono";
import {
	type NotFoundResponse,
	notFoundResponseSchema,
	unprocessableEntityResponseSchema,
} from "../schemas/error";
import { getUsersQuerySchema, getUsersResultSchema } from "../schemas/users";

const route = createRoute({
	method: "get",
	path: "/",
	tags: ["Users"],
	request: {
		query: getUsersQuerySchema,
	},
	responses: {
		200: {
			content: {
				"application/json": { schema: getUsersResultSchema },
			},
			description: "ユーザー一覧",
		},
		404: {
			content: {
				"application/json": { schema: notFoundResponseSchema },
			},
			description: "Not Found",
		},
		422: {
			content: {
				"application/json": { schema: unprocessableEntityResponseSchema },
			},
			description: "Validation failed",
		},
	},
});

const mockUsers = [
	{
		id: "b5c0c7c4-8654-49e3-923f-558f152ac23d",
		name: "Alice",
		email: "alice@example.com",
		createdAt: "2025-01-15T10:30:00Z",
	},
	{
		id: "8377ea52-9b32-42c9-94a1-c346dc492b1d",
		name: "Bob",
		email: "bob@example.com",
		createdAt: "2025-02-20T14:45:00Z",
	},
	{
		id: "d9250bd7-d56d-447d-a0e1-a027849ee16d",
		name: "Charlie",
		email: "charlie@example.com",
		createdAt: "2025-03-10T09:15:00Z",
	},
];

export const usersRoute = createHono().openapi(route, async (c) => {
	const { page, limit } = c.req.valid("query");

	const start = (page - 1) * limit;

	if (start >= mockUsers.length) {
		return c.json(
			{
				type: "about:blank",
				title: "Page not found",
				status: 404,
			} satisfies NotFoundResponse,
			404,
		);
	}

	const users = mockUsers.slice(start, start + limit);

	return c.json({ users, total: mockUsers.length }, 200);
});
