// common/auth/auth.middleware.ts (No changes)

import Elysia from "elysia";
import { AuthFailureError } from "../error/error";
import { auth } from "./auth";

export const betterAuth = new Elysia({ name: "better-auth" })
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ request: { headers } }) {
				const session = await auth.api.getSession({
					headers: headers,
				});

				if (!session) throw new AuthFailureError("Auth Fail Error");
				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});
