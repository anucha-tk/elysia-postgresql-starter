import data from "../../../package.json";
import { ConfigSchema } from "./config.schema";

const isTestEnvironment = Bun.env.NODE_ENV === "test";

const rawConfig = {
	app: {
		env: Bun.env.NODE_ENV,
		name: data.name,
		version: data.version,
		host: Bun.env.TEST_APP_HOST || Bun.env.APP_HOST || "localhost",
		port:
			(isTestEnvironment ? Bun.env.TEST_APP_PORT : Bun.env.APP_PORT) || "8000",
	},
	auth: {
		jwt: {
			secret: Bun.env.JWT_SECRET,
			expiresIn: Bun.env.JWT_EXPIRES_IN,
		},
	},
};

export const config = ConfigSchema.parse(rawConfig);
