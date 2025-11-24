import { config } from "../config";
import Logger from "../logger/logger";
import { NotFoundResponse } from "../response/ApiResponse";
import ErrorResponse from "../response/errorResponse";
import { ApiError } from "./error";

// biome-ignore lint/suspicious/noExplicitAny: <Error Handler>
export function handleError({ error, set, code }: any) {
	if (code === "VALIDATION") {
		set.status = 422;
		return new ErrorResponse(
			"Input validation failed",
			422,
			// biome-ignore lint/suspicious/noExplicitAny: <Validation err>
			error.all.map((e: any) => ({
				path: e.path,
				message: e.message,
			})),
		).send();
	}

	if (code === "NOT_FOUND") {
		return new NotFoundResponse("Not Found Error").send();
	}

	if (error instanceof ApiError) {
		return ApiError.handle(error);
	}

	// Custom error
	if (error instanceof ErrorResponse) {
		set.status = Number(error.code) || 500;
		return error.send();
	}

	if (config.app.env === "development") {
		console.error(error);
	}

	// Default
	set.status = 500;
	Logger.error(`Something error: ${error.message}`);
	return new ErrorResponse("Internal Server Error", 500).send();
}
