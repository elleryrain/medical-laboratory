CREATE TABLE "delivery_place" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD COLUMN "start_place_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD COLUMN "finish_place_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD COLUMN "service_id" integer;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD COLUMN "courier_name" varchar(60) NOT NULL;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD CONSTRAINT "courier_delivery_tasks_start_place_id_delivery_place_id_fk" FOREIGN KEY ("start_place_id") REFERENCES "public"."delivery_place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD CONSTRAINT "courier_delivery_tasks_finish_place_id_delivery_place_id_fk" FOREIGN KEY ("finish_place_id") REFERENCES "public"."delivery_place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD CONSTRAINT "courier_delivery_tasks_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" DROP COLUMN "start_place";--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" DROP COLUMN "finish_place";