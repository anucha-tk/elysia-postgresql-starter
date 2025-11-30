import { auth } from "../../common/auth/auth";

export class UserService {
	async signUp({
		name,
		email,
		password,
		image,
	}: {
		name: string;
		email: string;
		password: string;
		image?: string | null;
	}) {
		const { headers, response } = await auth.api.signUpEmail({
			body: {
				name,
				email,
				password,
				image: image || "",
			},
			returnHeaders: true,
		});
		return { setCookie: headers.get("set-cookie"), response };
	}

	async singIn(email: string, password: string) {
		const { headers, response } = await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			returnHeaders: true,
		});
		return { setCookie: headers.get("set-cookie"), response };
	}
}
