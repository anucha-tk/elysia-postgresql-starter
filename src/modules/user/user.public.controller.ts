import Elysia, { t } from "elysia";
import { pick } from "es-toolkit/object";
import jwt from "../../common/auth/jwt";
import { loggerPlugin } from "../../common/logger/loggerPlugin";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { createResponseSchema } from "../../common/response/response.schema";
import {
	type SignInResponse,
	type SignupResponse,
	userInsert,
	userSignInResponseSchema,
	userSignInSchema,
	userSignUpResponseSchema,
} from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

const usersController = new Elysia()
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
	);

export default usersController;
