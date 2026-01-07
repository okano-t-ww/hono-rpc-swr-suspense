import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { createApp } from "./lib/create-app";
import { usersRoute } from "./routes/users";

const app = createApp();

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json(
			{
				type: "about:blank",
				title: err.message,
				status: err.status,
			},
			err.status,
		);
	}

	console.error(err);
	return c.json(
		{
			type: "about:blank",
			title: "Internal Server Error",
			status: 500,
		},
		500,
	);
});

app.notFound((c) => {
	return c.json(
		{
			type: "about:blank",
			title: "Not Found",
			status: 404,
			instance: c.req.path,
		},
		404,
	);
});

app.use("*", cors({ origin: "*" }));

const routes = app
	.basePath("/api")
	.route("/users", usersRoute)
	.doc("/doc", {
		openapi: "3.0.0",
		info: {
			title: "Hono RPC SWR Example API",
			version: "1.0.0",
		},
	})
	.get("/swagger", swaggerUI({ url: "/api/doc" }));

const port = 3000;
console.log(`Server running at http://localhost:${port}`);

serve({ fetch: app.fetch, port });

export type AppType = typeof routes;
