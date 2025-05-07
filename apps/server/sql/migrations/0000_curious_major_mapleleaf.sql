CREATE TYPE "public"."role" AS ENUM('admin', 'paidUser', 'user');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
