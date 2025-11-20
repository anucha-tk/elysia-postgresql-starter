import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from "elysia";
import { Pool } from "pg";
import { users } from "./models/user/schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool
	.connect()
	.then(() => console.log("✅ Connected to PostgreSQL / PostGIS"))
	.catch((err) => console.error("❌ DB connection error:", err));

const db = drizzle(pool);

const app = new Elysia();
app.get("/", () => "Hello Elysia").listen(3000);

app.get("/users", async () => {
	return await db.select().from(users);
});

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
