import { auth } from "../../common/auth/auth";

class UserAdminService {
	static async updateRole(
		headers: any,
		userId: string,
		role: "admin" | "user" | "officer",
	) {
		console.log("updateRole");
		const res = await auth.api.setRole({
			body: {
				userId,
				role,
			},
			headers,
		});
		console.log(res);
	}
}

export default UserAdminService;
