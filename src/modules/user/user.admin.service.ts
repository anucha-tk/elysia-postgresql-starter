import { auth } from "../../common/auth/auth";
import type { Roles } from "../../common/auth/permissions";
import { NotFoundError } from "../../common/error/error";

class UserAdminService {
	async updateRole(headers: Headers, userId: string, role: Roles) {
		const { user } = await auth.api.setRole({
			body: {
				userId,
				role,
			},
			headers,
		});
		if (!user) throw new NotFoundError("User not found");
		return user;
	}
}

export default UserAdminService;
