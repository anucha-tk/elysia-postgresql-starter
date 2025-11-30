import { type Static, t } from "elysia";
import { createResponseSchema } from "../../common/response/response.schema";

// base
const userSchema = t.Object({
	id: t.String(),
	name: t.String(),
	email: t.String({ format: "email" }),
	emailVerified: t.Boolean(),
	password: t.String(),
	image: t.Optional(t.Nullable(t.String())),
	role: t.String(),
	ban_reason: t.Optional(t.Nullable(t.String())),
	createdAt: t.Date(),
	updatedAt: t.Date(),
});

// signUp
export const signUpSchema = t.Pick(userSchema, [
	"email",
	"password",
	"name",
	"image",
]);

export const signUpResponseSchema = createResponseSchema(
	t.Omit(userSchema, ["password"]),
);
export type SignUpResponse = Static<typeof signUpResponseSchema>;

// signIn
export const signInSchema = t.Pick(userSchema, ["email", "password"]);
export const signInResponseSchema = createResponseSchema(
	t.Omit(userSchema, ["password"]),
);
export type SignInResponse = Static<typeof signInResponseSchema>;
