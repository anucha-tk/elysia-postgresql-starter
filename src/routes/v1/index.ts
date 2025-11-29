import Elysia from "elysia";
import { appRouter } from "./app.routes";
import { usersRouter } from "./user.routes";

export const routeV1 = new Elysia({ prefix: "/api/v1" })
	.use(appRouter)
	.use(usersRouter);
