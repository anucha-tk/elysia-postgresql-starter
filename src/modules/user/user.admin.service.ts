import { auth } from "../../common/auth/auth";
import type { Roles } from "../../common/auth/permissions";

class UserAdminService {
	async updateRole(headers: Headers, userId: string, role: Roles) {
		return await auth.api.setRole({
			body: {
				userId,
				role,
			},
			headers,
		});
	}
}

export default UserAdminService;
