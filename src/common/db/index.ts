import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool
	.connect()
	.then(() => console.log("✅ Connected to PostgreSQL / PostGIS"))
	.catch((err) => console.error("❌ DB connection error:", err));

export const db = drizzle(pool, { schema });
