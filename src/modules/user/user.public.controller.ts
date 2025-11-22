import Elysia, { t } from "elysia";
import { pick } from "es-toolkit/object";
import jwt from "../../common/auth/jwt";
import { loggerPlugin } from "../../common/logger/loggerPlugin";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { createResponseSchema } from "../../common/response/response.schema";
import {
	type SignupResponse,
	userInsert,
	userResponseSchema,
} from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

const usersController = new Elysia()
	.use(loggerPlugin)
	.use(jwt)
	.post(
		"/signup",
		async ({ body, log }) => {
			const user = await userService.create(body);
			log.info("Signup Request:", { email: body.email });
			return new SuccessResponse(
				"User created successfully",
				pick(user, ["id", "name", "email", "age"]),
			).send() as SignupResponse;
		},
		{
			body: t.Pick(userInsert, ["email", "name", "password", "age"]),
			response: createResponseSchema(userResponseSchema),
			detail: {
				tags: ["Auth"],
			},
		},
	);

export default usersController;
