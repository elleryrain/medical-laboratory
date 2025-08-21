CREATE TYPE "public"."courier_delivery_type_enum" AS ENUM('delivery', 'pickup');--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ALTER COLUMN "courier_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "courier_delivery_tasks" ADD COLUMN "deliveryType" "courier_delivery_type_enum" DEFAULT 'delivery';