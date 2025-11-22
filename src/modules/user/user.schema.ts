import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { createResponseSchema } from "../../common/response/response.schema";
import { users } from "./user.model";

// extend validation
export const userInsert = createInsertSchema(users, {
	email: t.String({ format: "email" }),
	age: t.Optional(t.Nullable(t.Number({ minimum: 0 }))),
});

export const userSelect = createSelectSchema(users);

export type UserInsert = Static<typeof userInsert>;
export type User = Static<typeof userSelect>;

// signup
export const userResponseSchema = t.Pick(userInsert, [
	"id",
	"name",
	"email",
	"age",
]);
const signupResponseSchema = createResponseSchema(userResponseSchema);
export type SignupResponse = Static<typeof signupResponseSchema>;
