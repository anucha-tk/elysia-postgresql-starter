import Elysia from "elysia";
import adminController from "../../modules/user/user.admin.controller";
import usersAuthController from "../../modules/user/user.auth.controller";
import usersController from "../../modules/user/user.controller";

export const usersRouter = new Elysia({ prefix: "/user" })
	.use(usersController)
	.use(usersAuthController)
	.use(adminController);
