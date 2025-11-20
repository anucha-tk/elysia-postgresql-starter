import { Elysia } from "elysia";
import { config } from "./common/config";
import { db } from "./common/db";

db;

const app = new Elysia();

app.listen(config.app.port, () => {
	console.log(`Environment: ${config.app.env}`);
	console.log(
		`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`,
	);
});
