import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import Logger from "../logger/logger";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool
	.connect()
	.then(() => Logger.info("✅ Connected to PostgreSQL / PostGIS"))
	.catch((err) => Logger.error("❌ DB connection error:", err));

export const db = drizzle(pool, { schema });
