import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { config } from "./common/config";
import { db } from "./common/db";
import { handleError } from "./common/error/handler";
import { loggerPlugin } from "./common/logger/loggerPlugin";
import { routeV1 } from "./routes/v1";

export const app = new Elysia();

db;

app
	.use(
		cors({
			origin: "http://localhost:3001",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(openapi())
	.use(loggerPlugin)
	.onError(handleError)
	.use(routeV1)
	.listen(config.app.port, () => {
		console.log(`Environment: ${config.app.env}`);
		console.log(
			`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`,
		);
	});
