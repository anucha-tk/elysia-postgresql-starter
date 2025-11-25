import Elysia from "elysia";
import usersAuthController from "../../modules/user/user.auth.controller";
import usersPublicController from "../../modules/user/user.public.controller";

export const usersRouter = new Elysia()
	.use(usersPublicController)
	.use(usersAuthController);
