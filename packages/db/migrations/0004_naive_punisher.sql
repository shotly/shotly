CREATE TYPE "public"."webhook_events" AS ENUM('bookmarkCreated', 'bookmarkDeleted', 'collectionCreated', 'collectionDeleted');--> statement-breakpoint
CREATE TABLE "webhooks" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"events" "webhook_events"[] NOT NULL,
	"secret" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;