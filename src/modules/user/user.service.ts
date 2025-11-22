import { db } from "../../common/db";
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
}
