import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

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
