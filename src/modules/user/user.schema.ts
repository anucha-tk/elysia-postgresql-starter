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
export const userSignUpResponseSchema = t.Object({
	id: t.Number(),
	...t.Pick(userSelect, ["name", "email"]).properties,
	age: t.Number(),
	token: t.String(),
});
const signupResponseSchema = createResponseSchema(userSignUpResponseSchema);
export type SignupResponse = Static<typeof signupResponseSchema>;

// Login
export const userSignInSchema = t.Object({
	email: t.String({ format: "email" }),
	password: t.String({ minLength: 8 }),
});
export const userSignInResponseSchema = t.Object({
	id: t.Number(),
	...t.Pick(userSelect, ["name", "email"]).properties,
	token: t.String(),
});

const signInResponseSchema = createResponseSchema(userSignInResponseSchema);
export type SignInResponse = Static<typeof signInResponseSchema>;
