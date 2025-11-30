/** biome-ignore-all lint/suspicious/noExplicitAny: <Fix any Error> */
import pkg from "../../../package.json";

export enum StatusCode {
	SUCCESS = "10000",
	FAILURE = "10001",
	RETRY = "10002",
	INVALID_ACCESS_TOKEN = "10003",
}

export enum ResponseStatus {
	SUCCESS = 200,
	CREATE_SUCCESS = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	Unprocessable_Content = 422,
	INTERNAL_ERROR = 500,
}

interface Meta {
	[key: string]: any;
}

export class ApiResponse<T = any> {
	constructor(
		protected statusCode: StatusCode,
		protected status: ResponseStatus,
		protected message: string,
		protected data?: T,
		protected metadata?: Meta,
	) {}

	// Return object instead of sending response (Elysia-friendly)
	send(set?: { status: number }): object {
		if (set) {
			set.status = this.status;
		}
		return {
			_metadata: {
				version: pkg.version,
				timestamp: Date.now(),
				...this.metadata,
			},
			status: this.status,
			message: this.message,
			data: this.data ?? null,
		};
	}
}

// ----------------------------
// SUCCESS RESPONSES
// ----------------------------

export class SuccessResponse<T> extends ApiResponse<T> {
	constructor(message: string, data?: T, metadata: Meta = {}) {
		super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message, data, metadata);
	}
}

export class SuccessCreateResponse<T> extends ApiResponse<T> {
	constructor(message: string, data?: T, metadata: Meta = {}) {
		super(
			StatusCode.SUCCESS,
			ResponseStatus.CREATE_SUCCESS,
			message,
			data,
			metadata,
		);
	}
}

// ----------------------------
// ERROR RESPONSES
// ----------------------------

export class InternalErrorResponse extends ApiResponse {
	constructor(message = "Internal Error") {
		super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
	}
}

export class ForbiddenResponse extends ApiResponse {
	constructor(message = "Forbidden") {
		super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
	}
}

export class BadRequestResponse extends ApiResponse {
	constructor(message = "Bad Parameters") {
		super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
	}
}

export class AuthFailureResponse extends ApiResponse {
	constructor(message = "Authentication Failure") {
		super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
	}
}

export class NotFoundResponse extends ApiResponse {
	constructor(message = "Not Found") {
		super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
	}
}

export class AccessTokenErrorResponse extends ApiResponse {
	private instruction = "refresh_token";

	constructor(message = "Access token invalid") {
		super(
			StatusCode.INVALID_ACCESS_TOKEN,
			ResponseStatus.UNAUTHORIZED,
			message,
		);
	}

	send(set?: { status: number }): object {
		if (set) set.status = this.status;
		return {
			...super.send(),
			instruction: this.instruction,
		};
	}
}

export class UnprocessableContentResponse<T> extends ApiResponse<T> {
	constructor(message = "Unprocessable Content", data?: T) {
		super(
			StatusCode.FAILURE,
			ResponseStatus.Unprocessable_Content,
			message,
			data,
		);
	}
}
