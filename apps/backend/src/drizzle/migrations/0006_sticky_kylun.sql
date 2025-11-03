CREATE TABLE "daily_task" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"color" varchar(30) NOT NULL,
	"finish_date_time" timestamp NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL,
	"admin_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "delivery_place" RENAME TO "place";--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" DROP CONSTRAINT "courier_delivery_tasks_start_place_id_delivery_place_id_fk";
--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" DROP CONSTRAINT "courier_delivery_tasks_finish_place_id_delivery_place_id_fk";
--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD CONSTRAINT "courier_delivery_tasks_start_place_id_place_id_fk" FOREIGN KEY ("start_place_id") REFERENCES "public"."place"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD CONSTRAINT "courier_delivery_tasks_finish_place_id_place_id_fk" FOREIGN KEY ("finish_place_id") REFERENCES "public"."place"("id") ON DELETE no action ON UPDATE no action;