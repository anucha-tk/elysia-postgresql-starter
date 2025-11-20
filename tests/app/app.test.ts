import { describe, expect, it } from "bun:test";
import { app } from "../../src/app";
import { config } from "../../src/common/config";
import { getRequest } from "..";

describe("Elysia", () => {
	it("returns a response", async () => {
		const response = await app
			.handle(getRequest("/"))
			.then((res: Response) => res.json());

		expect(response).toMatchObject({
			name: config.app.name,
			version: config.app.version,
		});
	});
});
