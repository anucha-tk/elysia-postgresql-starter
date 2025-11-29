import Elysia from "elysia";
import { betterAuth } from "../../common/auth/auth.middleware";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { type SignInResponse, signInResponseSchema } from "./user.schema";

const usersAuthController = new Elysia().use(betterAuth).get(
	"/me",
	async ({ user }) => {
		return new SuccessResponse(
			"Get User Successful",
			user,
		).send() as SignInResponse;
	},
	{
		auth: true,
		response: signInResponseSchema,
		detail: {
			tags: ["User"],
		},
	},
);

export default usersAuthController;
