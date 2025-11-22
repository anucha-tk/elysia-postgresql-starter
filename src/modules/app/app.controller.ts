import Elysia from "elysia";
import { config } from "../../common/config";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { createResponseSchema } from "../../common/response/response.schema";
import { type AppResponse, appRes } from "./app.schema";

const appController = new Elysia().get(
	"/app",
	() =>
		new SuccessResponse("App Successful", {
			name: config.app.name,
			version: config.app.version,
		}).send() as AppResponse,
	{
		response: createResponseSchema(appRes),
		detail: {
			tags: ["App"],
		},
	},
);

export default appController;
