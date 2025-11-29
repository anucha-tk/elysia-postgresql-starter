import Elysia from "elysia";
import { NotFoundResponse } from "../../common/response/ApiResponse";
import { appRouter } from "./app.routes";
import { usersRouter } from "./user.routes";

export const routeV1 = new Elysia({ prefix: "/api/v1" })
	.use(appRouter)
	.use(usersRouter)
	.all(
		"*",
		({ set }) => {
			set.status = 404;
			return new NotFoundResponse().send();
		},
		{
			detail: {
				hide: true,
			},
		},
	);
