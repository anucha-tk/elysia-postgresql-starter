import Elysia, { t } from "elysia";
import { betterAuth } from "../../common/auth/auth.middleware";
import { rolesSchema } from "../../common/auth/permissions";
import { SuccessResponse } from "../../common/response/ApiResponse";
import {
	type BaseResponse,
	createResponseSchema,
} from "../../common/response/response.schema";
import UserAdminService from "./user.admin.service";

const userAdminService = new UserAdminService();

const adminController = new Elysia({ prefix: "/admin" }).use(betterAuth).post(
	"/set-role",
	async ({ request: { headers }, body: { userId, role } }) => {
		await userAdminService.updateRole(headers, userId, role);
		return new SuccessResponse("Update Role Successful").send() as BaseResponse;
	},
	{
		auth: true,
		body: t.Object({
			userId: t.String(),
			role: rolesSchema,
		}),
		response: createResponseSchema(),
		detail: {
			tags: ["admin"],
		},
	},
);

export default adminController;
