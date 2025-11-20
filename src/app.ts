import { Elysia } from "elysia";
import { config } from "./common/config";
import { db } from "./common/db";

export const app = new Elysia();
db;

app
	.get("/", () => ({
		name: config.app.name,
		version: config.app.version,
	}))
	.listen(config.app.port, () => {
		console.log(`Environment: ${config.app.env}`);
		console.log(
			`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`,
		);
	});
