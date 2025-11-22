import { type TSchema, t } from "elysia";

export const createResponseSchema = (dataSchema?: TSchema) =>
	t.Object({
		_metadata: t.Object({
			timestamp: t.Integer(),
		}),
		status: t.Number(),
		message: t.String(),
		data: t.Optional(dataSchema ?? t.Any()),
	});
