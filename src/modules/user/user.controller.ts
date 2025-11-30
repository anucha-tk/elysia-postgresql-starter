import Elysia from "elysia";
import { auth } from "../../common/auth/auth";
import { betterAuth } from "../../common/auth/auth.middleware";
import {
	ForbiddenResponse,
	SuccessResponse,
} from "../../common/response/ApiResponse";
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
			if (!user.role) throw new Error("not have role");
			const res = await auth.api.userHasPermission({
				body: {
					userId: user.id,
					role: user.role as "admin" | "user" | "officer",
					permission: { officer: ["update"] },
				},
			});
			if (!res.success) {
				return new ForbiddenResponse("Authorization Fail").send();
			}
		},
		{
			auth: true,
		},
	);

export default usersController;
