import { type Static, type TSchema, t } from "elysia";

export const createResponseSchema = (dataSchema?: TSchema, example?: unknown) =>
	t.Object(
		{
			_metadata: t.Object({
				timestamp: t.Integer(),
			}),
			status: t.Number(),
			message: t.String(),
			data: t.Optional(dataSchema ?? t.Any()),
		},
		{ example },
	);

const baseResponseSchema = createResponseSchema();
export type BaseResponse = Static<typeof baseResponseSchema>;
