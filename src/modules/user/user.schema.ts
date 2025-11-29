import { type Static, t } from "elysia";
import { createResponseSchema } from "../../common/response/response.schema";

// base
const userSchema = t.Object({
	id: t.String(),
	name: t.String(),
	email: t.String({ format: "email" }),
	emailVerified: t.Boolean(),
	image: t.Optional(t.Nullable(t.String())),
	createdAt: t.Date(),
	updatedAt: t.Date(),
});

// signUp
export const signUpSchema = t.Object({
	name: t.String(),
	email: t.String({ format: "email" }),
	password: t.String(),
	image: t.Optional(t.Nullable(t.String())),
});

export const signUpResponseSchema = createResponseSchema(userSchema);
export type SignUpResponse = Static<typeof signUpResponseSchema>;

// signIn
export const signInSchema = t.Object({
	email: t.String({ format: "email" }),
	password: t.String(),
});
export const signInResponseSchema = createResponseSchema(userSchema);
export type SignInResponse = Static<typeof signInResponseSchema>;
