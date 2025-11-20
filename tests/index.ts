import path from "node:path";
import { config } from "../src/common/config";

export const baseUrl = `http://${config.app.host}:${config.app.port}`;

export function getRequest(route: string) {
	const fullPath = path.join(baseUrl, route);

	return new Request(fullPath);
}

export function postRequest<Payload extends Record<string, unknown>>(
	route: string,
	payload: Payload,
) {
	const fullPath = path.join(baseUrl, route);

	return new Request(fullPath, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
}
