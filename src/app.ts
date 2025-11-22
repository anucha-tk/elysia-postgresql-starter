import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { config } from "./common/config";
import { db } from "./common/db";
import { handleError } from "./common/error/handler";
import { loggerPlugin } from "./common/logger/loggerPlugin";
import usersController from "./modules/user/user.controller";
export const app = new Elysia();

db;

app
	.get("/", () => ({
		name: config.app.name,
		version: config.app.version,
	}))
	.use(openapi())
	.use(loggerPlugin)
	.onError(handleError)
	.use(usersController)
	.listen(config.app.port, () => {
		console.log(`Environment: ${config.app.env}`);
		console.log(
			`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`,
		);
	});
