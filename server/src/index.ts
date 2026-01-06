import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { usersRoute } from "./routes/users";

const app = new OpenAPIHono();

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
