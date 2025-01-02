ALTER TABLE "newUser" RENAME COLUMN "updated_by_id" TO "updatedById";--> statement-breakpoint
ALTER TABLE "newUser" DROP CONSTRAINT "newUser_updated_by_id_newUser_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newUser" ADD CONSTRAINT "newUser_updatedById_newUser_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."newUser"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
