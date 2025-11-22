import type { APIError } from "./error";

export function handleError({ error, set, code }: any) {
	switch (code) {
		case "APIError": {
			const apiError = error as APIError;
			set.status = apiError.httpCode;
			return {
				status: "error",
				message: apiError.message,
				code: apiError.name,
			};
		}

		case "VALIDATION": {
			set.status = 422;
			return {
				status: 422,
				message: "Input validation failed",
				errors: error.all.map((e: any) => ({
					path: e.path,
					message: e.message,
				})),
				errorCode: "VALIDATION_FAILED",
			};
		}

		case "NOT_FOUND": {
			set.status = 404;
			return { status: "error", message: "Not Found" };
		}

		default: {
			set.status = 500;
			console.error(error);
			return { status: "error", message: "Internal Server Error" };
		}
	}
}
