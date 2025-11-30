import Elysia from "elysia";
import { auth } from "../../common/auth/auth";
import { betterAuth } from "../../common/auth/auth.middleware";
import type { Roles } from "../../common/auth/permissions";
import { BadRequestError, ForbiddenError } from "../../common/error/error";
import { SuccessResponse } from "../../common/response/ApiResponse";
import { type SignInResponse, signInResponseSchema } from "./user.schema";

const usersController = new Elysia()
	.use(betterAuth)
	.get(
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
	)
	.get(
		"/test-user",
		async ({ user }) => {
			if (!user.role) throw new BadRequestError("User not have any role");
			const res = await auth.api.userHasPermission({
				body: {
					userId: user.id,
					role: user.role as Roles,
					permission: { officer: ["update"] },
				},
			});
			if (!res.success) {
				throw new ForbiddenError("Authorization Fail");
			}
		},
		{
			auth: true,
			detail: {
				hide: true,
			},
		},
	);

export default usersController;
