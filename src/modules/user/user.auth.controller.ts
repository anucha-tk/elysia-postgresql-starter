import Elysia from "elysia";
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
	signUpSchema,
} from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

const usersAuthController = new Elysia()
	.use(loggerPlugin)
	.post(
		"/sign-up",
		async ({ body, set }) => {
			const { setCookie, response } = await userService.signUp(body);
			if (setCookie) {
				set.headers["set-cookie"] = setCookie;
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
			body: signUpSchema,
			response: signUpResponseSchema,
			detail: {
				tags: ["Auth"],
			},
		},
	)
	.post(
		"/sign-in",
		async ({ body: { email, password }, set }) => {
			const { setCookie, response } = await userService.singIn(email, password);
			if (setCookie) {
				set.headers["set-cookie"] = setCookie;
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
