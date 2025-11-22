export default class ErrorResponse extends Error {
	message: string;
	code: number | string;
	// biome-ignore lint/suspicious/noExplicitAny: <ErrorResponse>
	errors?: any;

	// biome-ignore lint/suspicious/noExplicitAny: <ErrorResponse>
	constructor(message: string, code: number | string, errors?: any) {
		super(message);
		this.message = message;
		this.code = code;
		this.errors = errors;
	}

	send() {
		return {
			_metadata: { timestamp: Date.now() },
			status: Number(this.code) || 500,
			message: this.message,
			errors: this.errors,
		};
	}
}
