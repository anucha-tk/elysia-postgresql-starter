export class APIError extends Error {
	public readonly message: string;
	public readonly httpCode: number;

	constructor(httpCode: number, message: string, options?: ErrorOptions) {
		super(message, options);
		this.httpCode = httpCode;
		this.message = message;
		this.name = "APIError";
		Object.setPrototypeOf(this, APIError.prototype);
		Error.captureStackTrace(this);
	}
}
