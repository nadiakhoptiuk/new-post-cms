CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newUser" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "newUser_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" varchar(40) NOT NULL,
	"lastName" varchar(40) NOT NULL,
	"email" varchar(40) NOT NULL,
	"password" varchar(12) NOT NULL,
	"role" "roles" DEFAULT 'user',
	"updated_at" timestamp,
	"updated_by_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "newUser_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newUser" ADD CONSTRAINT "newUser_updated_by_id_newUser_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."newUser"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
