import { type Static, t } from "elysia";
import { createResponseSchema } from "../../common/response/response.schema";

export const appRes = t.Object({ name: t.String(), version: t.String() });
const appResponseSchema = createResponseSchema(appRes);
export type AppResponse = Static<typeof appResponseSchema>;
