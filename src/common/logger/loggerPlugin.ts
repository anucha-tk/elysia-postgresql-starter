import { Elysia } from "elysia";
import Logger from "./logger";

export const loggerPlugin = new Elysia({ name: "file-logger" })
	.decorate("log", Logger)
	.onBeforeHandle((context) => {
		Logger.debug(`Incoming Request: ${context.request.method} ${context.path}`);
	});
