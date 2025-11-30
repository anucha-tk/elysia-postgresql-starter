import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { db } from "../db";
import { ac, admin, officer, user } from "./permissions";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	plugins: [
		adminPlugin({
			ac,
			roles: {
				admin,
				user,
				officer,
			},
			defaultRole: "user",
		}),
	],
});
