import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { t } from "elysia";

export const statement = {
	...defaultStatements,
	officer: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
	officer: ["read"],
});

export const admin = ac.newRole({
	...adminAc.statements,
	officer: ["create", "read", "update", "delete"],
});

export const officer = ac.newRole({
	officer: ["create", "read", "update", "delete"],
});

export type Roles = "admin" | "user" | "officer";
export const rolesSchema = t.Enum({
	admin: "admin",
	user: "user",
	officer: "officer",
});
