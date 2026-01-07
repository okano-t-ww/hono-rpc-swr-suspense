import { createRoute } from "@hono/zod-openapi";
import { createHono } from "../lib/create-hono";
import { unprocessableEntityResponseSchema } from "../schemas/error";
import {
	createUserInputSchema,
	createUserResultSchema,
	getUsersQuerySchema,
	getUsersResultSchema,
} from "../schemas/users";

const getUsersRoute = createRoute({
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
		422: {
			content: {
				"application/json": { schema: unprocessableEntityResponseSchema },
			},
			description: "Validation failed",
		},
	},
});

const createUserRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["Users"],
	request: {
		body: {
			content: {
				"application/json": { schema: createUserInputSchema },
			},
		},
	},
	responses: {
		201: {
			content: {
				"application/json": { schema: createUserResultSchema },
			},
			description: "ユーザー作成成功",
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

export const usersRoute = createHono()
	.openapi(getUsersRoute, async (c) => {
		const { page, limit } = c.req.valid("query");

		const start = (page - 1) * limit;
		const users = mockUsers.slice(start, start + limit);

		return c.json({ users, total: mockUsers.length }, 200);
	})
	.openapi(createUserRoute, async (c) => {
		const { name, email } = c.req.valid("json");

		const newUser = {
			id: crypto.randomUUID(),
			name,
			email,
			createdAt: new Date().toISOString(),
		};

		mockUsers.push(newUser);

		return c.json(newUser, 201);
	});
