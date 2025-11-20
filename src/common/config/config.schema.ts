import { z } from "zod";

export const ConfigSchema = z.object({
	app: z.object({
		env: z.string(),
		name: z.string(),
		version: z.string(),
		host: z.string().default("localhost"),
		port: z.string(),
	}),
	auth: z.object({
		jwt: z.object({
			secret: z.string().min(1, "JWT_SECRET is required"),
			expiresIn: z.string().min(1, "JWT_EXPIRES_IN is required"),
		}),
	}),
});
