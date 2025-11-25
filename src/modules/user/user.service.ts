import { eq } from "drizzle-orm";
import { db } from "../../common/db";
import { AuthFailureError } from "../../common/error/error";
import { users } from "./user.model";
import type { UserInsert } from "./user.schema";

export class UserService {
	async create(body: UserInsert) {
		try {
			const hashedPassword = await Bun.password.hash(body.password);

			const data = {
				name: body.name,
				email: body.email,
				password: hashedPassword,
				age: body.age ?? null,
			};

			const res = await db.insert(users).values(data).returning();

			return res[0];
		} catch (err) {
			throw new Error(`UserService.create() failed: ${(err as Error).message}`);
		}
	}

	async authenticate(email: string, password: string) {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user[0]) {
			throw new AuthFailureError("Auth Fail");
		}

		const isMatch = await Bun.password.verify(password, user[0].password);

		if (!isMatch) {
			throw new AuthFailureError("Auth Fail");
		}

		return user[0];
	}

	async find(id: number) {
		return await db.query.users.findFirst({
			where: eq(users.id, id),
		});
	}
}
