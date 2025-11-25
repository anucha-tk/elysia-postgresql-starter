import type { Context } from "elysia";
import { AuthFailureError } from "../error/error";
import type { JWTContext } from "./jwt";

export const getAuthUserId = async ({
	headers: { authorization },
	jwt,
}: Pick<Context, "headers"> & JWTContext) => {
	const token = authorization?.replace("Token", "");
	const payload = await jwt.verify(token);
	if (!payload || !payload.id) {
		throw new AuthFailureError("Auth Fail");
	}
	return { userId: +payload.id };
};
