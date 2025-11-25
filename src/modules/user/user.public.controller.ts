import Elysia, { t } from "elysia";
import { pick } from "es-toolkit/object";
import { getAuthUserId } from "../../common/auth/authUtils";
import jwt from "../../common/auth/jwt";
import { AuthFailureError, NotFoundError } from "../../common/error/error";
import { loggerPlugin } from "../../common/logger/loggerPlugin";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { createResponseSchema } from "../../common/response/response.schema";
import {
	type MeResponse,
	meSchema,
	type SignInResponse,
	type SignupResponse,
	userInsert,
	userSignInResponseSchema,
	userSignInSchema,
	userSignUpResponseSchema,
} from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

const usersPublicController = new Elysia()
	.use(loggerPlugin)
	.use(jwt)
	.post(
		"/user/sign-up",
		async ({ body, log, jwt }) => {
			const user = await userService.create(body);
			const token = await jwt.sign({ id: user.id });
			log.info("Signup Request:", { email: body.email });
			return new SuccessResponse("User created successfully", {
				...pick(user, ["id", "name", "email", "age"]),
				token,
			}).send() as SignupResponse;
		},
		{
			body: t.Pick(userInsert, ["email", "name", "password", "age"]),
			response: createResponseSchema(userSignUpResponseSchema),
			detail: {
				tags: ["Auth"],
			},
		},
	)
	.post(
		"/user/sign-in",
		async ({ body, jwt }) => {
			const { email, password } = body;
			const user = await userService.authenticate(email, password);
			const token = await jwt.sign({ id: user.id });
			return new SuccessResponse("Login successfully", {
				...pick(user, ["id", "email", "name"]),
				token,
			}).send() as SignInResponse;
		},
		{
			body: userSignInSchema,
			response: createResponseSchema(userSignInResponseSchema),
			detail: {
				tags: ["Auth"],
			},
		},
	)
	.guard(
		{
			beforeHandle({ headers: { authorization } }) {
				if (!authorization || authorization.toString() === "") {
					throw new AuthFailureError("Auth Fail");
				}
			},
		},
		(app) =>
			app.resolve(getAuthUserId).get(
				"/get-me",
				async ({ userId }) => {
					const user = await userService.find(userId);
					if (!user) {
						throw new NotFoundError("User not found");
					}
					return new SuccessResponse(
						"Get User Successful",
						pick(user, ["id", "name", "email", "age"]),
					).send() as MeResponse;
				},
				{
					response: createResponseSchema(meSchema),
					detail: {
						tags: ["User"],
					},
				},
			),
	);

export default usersPublicController;
