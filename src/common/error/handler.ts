import { APIError } from "better-auth/api";
import { config } from "../config";
import Logger from "../logger/logger";
import {
	AuthFailureResponse,
	BadRequestResponse,
	ForbiddenResponse,
	InternalErrorResponse,
	NotFoundResponse,
	UnprocessableContentResponse,
} from "../response/ApiResponse";
import ErrorResponse from "../response/errorResponse";
import { ApiError } from "./error";

// biome-ignore lint/suspicious/noExplicitAny: <Error Handler>
export function handleError({ error, set, code }: any) {
	if (code === "NOT_FOUND" || error.status === 404) {
		set.status = 404;
		return new NotFoundResponse().send();
	}

	// handle with better-auth
	if (error instanceof APIError) {
		console.log(error);
		set.status = error.statusCode;
		const errMsg = error.message || "Auth Fail";
		switch (error.statusCode) {
			case 400:
				return new BadRequestResponse(errMsg).send();
			case 401:
				return new AuthFailureResponse(errMsg).send();
			case 403:
				return new ForbiddenResponse(errMsg).send();
			case 422:
				return new UnprocessableContentResponse(errMsg).send();
			default:
				set.status = 500;
				Logger.error(`Better-auth error: ${error.message}`);
				return new InternalErrorResponse(errMsg).send();
		}
	}

	if (
		error.status === "UNPROCESSABLE_ENTITY" &&
		error.body.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
	) {
		set.status = 400;
		return new BadRequestResponse("Email is already exist").send();
	}
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

	if (error instanceof ApiError) {
		return ApiError.handle(error, set);
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
