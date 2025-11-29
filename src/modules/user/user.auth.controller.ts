import Elysia, { t } from "elysia";
import { auth } from "../../common/auth/auth";
import { loggerPlugin } from "../../common/logger/loggerPlugin";
import { SuccessResponse } from "../../common/response/ApiResponse";
import {
	type BaseResponse,
	createResponseSchema,
} from "../../common/response/response.schema";
import {
	type SignInResponse,
	type SignUpResponse,
	signInResponseSchema,
	signInSchema,
	signUpResponseSchema,
} from "./user.schema";

const usersAuthController = new Elysia()
	.use(loggerPlugin)
	.post(
		"/sign-up",
		async ({ body: { name, email, password, image }, set }) => {
			const { headers, response } = await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
					image: image || "",
				},
				returnHeaders: true,
			});

			const setCookieHeader = headers.get("set-cookie");

			if (setCookieHeader) {
				set.headers["set-cookie"] = setCookieHeader;
			}

			const userData = {
				...response.user,
				image: response.user.image || null,
				createdAt: response.user.createdAt,
				updatedAt: response.user.updatedAt,
			};

			return new SuccessResponse(
				"User created successfully",
				userData,
			).send() as SignUpResponse;
		},
		{
			body: t.Object({
				name: t.String({ minLength: 1, maxLength: 255 }),
				email: t.String({ format: "email" }),
				password: t.String({ minLength: 8, maxLength: 20 }),
				image: t.Optional(t.Nullable(t.String())),
			}),
			response: signUpResponseSchema,
			detail: {
				tags: ["Auth"],
			},
		},
	)
	.post(
		"/sign-in",
		async ({ body: { email, password }, set }) => {
			const { headers, response } = await auth.api.signInEmail({
				body: {
					email,
					password,
				},
				returnHeaders: true,
			});

			const setCookieHeader = headers.get("set-cookie");

			if (setCookieHeader) {
				set.headers["set-cookie"] = setCookieHeader;
			}
			return new SuccessResponse(
				"Login successfully",
				response.user,
			).send() as SignInResponse;
		},
		{
			body: signInSchema,
			response: signInResponseSchema,
			detail: {
				tags: ["Auth"],
			},
		},
	)
	.post(
		"/logout",
		async ({ request: { headers } }) => {
			await auth.api.signOut({
				headers,
			});
			return new SuccessResponse("Logout successful").send() as BaseResponse;
		},
		{
			response: createResponseSchema(),
			detail: {
				tags: ["Auth"],
			},
		},
	);

export default usersAuthController;
