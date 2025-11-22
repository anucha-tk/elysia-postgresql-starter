import { sql } from "drizzle-orm";
import {
	check,
	integer,
	pgTable,
	smallint,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: varchar({ length: 255 }).notNull(),
		age: smallint(),
		email: varchar({ length: 255 }).notNull().unique(),
		password: varchar().notNull(),
	},
	(table) => [check("age_check1", sql`${table.age} > 0`)],
);
