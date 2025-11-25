import Elysia from "elysia";
import { pick } from "es-toolkit/object";
import { getAuthUserId } from "../../common/auth/authUtils";
import jwt from "../../common/auth/jwt";
import { AuthFailureError, NotFoundError } from "../../common/error/error";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { createResponseSchema } from "../../common/response/response.schema";
import { type MeResponse, meSchema } from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

const usersAuthController = new Elysia().use(jwt).guard(
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

export default usersAuthController;
