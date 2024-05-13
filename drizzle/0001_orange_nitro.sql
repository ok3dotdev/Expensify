ALTER TABLE "accounts" ADD COLUMN "bank_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_bank_id_connected_banks_id_fk" FOREIGN KEY ("bank_id") REFERENCES "public"."connected_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
