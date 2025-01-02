ALTER TABLE "guestBook" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "guestBook" CASCADE;--> statement-breakpoint
ALTER TABLE "newUser" RENAME TO "User";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "newUser_email_unique";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "newUser_updatedById_newUser_id_fk";
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_User_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");