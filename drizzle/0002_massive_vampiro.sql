ALTER TABLE "users" ALTER COLUMN "age" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "age_check1" CHECK ("users"."age" > 0);