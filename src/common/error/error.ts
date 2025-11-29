import {
	AccessTokenErrorResponse,
	AuthFailureResponse,
	BadRequestResponse,
	ForbiddenResponse,
	InternalErrorResponse,
	NotFoundResponse,
} from "../response/ApiResponse";

export enum ErrorType {
	BAD_TOKEN = "BadTokenError",
	TOKEN_EXPIRED = "TokenExpiredError",
	UNAUTHORIZED = "AuthFailureError",
	ACCESS_TOKEN = "AccessTokenError",
	INTERNAL = "InternalError",
	NOT_FOUND = "NotFoundError",
	BAD_REQUEST = "BadRequestError",
	FORBIDDEN = "ForbiddenError",
}

export class ApiError extends Error {
	constructor(
		public type: ErrorType,
		public message: string = "error",
	) {
		super(type);
	}

	public static handle(err: ApiError, set?: { status: number }): object {
		switch (err.type) {
			case ErrorType.BAD_TOKEN:
			case ErrorType.TOKEN_EXPIRED:
			case ErrorType.UNAUTHORIZED:
				return new AuthFailureResponse(err.message).send(set);
			case ErrorType.ACCESS_TOKEN:
				return new AccessTokenErrorResponse(err.message).send(set);
			case ErrorType.INTERNAL:
				return new InternalErrorResponse(err.message).send(set);
			case ErrorType.NOT_FOUND:
				return new NotFoundResponse(err.message).send(set);
			case ErrorType.BAD_REQUEST:
				return new BadRequestResponse(err.message).send(set);
			case ErrorType.FORBIDDEN:
				return new ForbiddenResponse(err.message).send(set);
			default:
				return new InternalErrorResponse(err.message).send(set);
		}
	}
}

// Specific error classes
export class ForbiddenError extends ApiError {
	constructor(message = "Permission denied") {
		super(ErrorType.FORBIDDEN, message);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Not Found") {
		super(ErrorType.NOT_FOUND, message);
	}
}

export class InternalError extends ApiError {
	constructor(message = "Internal error") {
		super(ErrorType.INTERNAL, message);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad Request") {
		super(ErrorType.BAD_REQUEST, message);
	}
}

export class AuthFailureError extends ApiError {
	constructor(message = "Invalid Credentials") {
		super(ErrorType.UNAUTHORIZED, message);
	}
}

export class TokenExpiredError extends ApiError {
	constructor(message = "Token is expired") {
		super(ErrorType.TOKEN_EXPIRED, message);
	}
}

export class AccessTokenError extends ApiError {
	constructor(message = "Invalid access token") {
		super(ErrorType.ACCESS_TOKEN, message);
	}
}

export class BadTokenError extends ApiError {
	constructor(message = "Token is not valid") {
		super(ErrorType.BAD_TOKEN, message);
	}
}
