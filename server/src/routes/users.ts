import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { apiErrorResponseSchema } from "../schemas/error";
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
		400: {
			content: {
				"application/json": { schema: apiErrorResponseSchema },
			},
			description: "Bad Request",
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

export const usersRoute = new OpenAPIHono().openapi(route, async (c) => {
	const { page, limit } = c.req.valid("query");

	const start = (page - 1) * limit;
	const users = mockUsers.slice(start, start + limit);

	return c.json({ users, total: mockUsers.length }, 200);
});
