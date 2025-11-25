import Elysia from "elysia";
import appController from "../../modules/app/app.controller";

export const appRouter = new Elysia().use(appController);
