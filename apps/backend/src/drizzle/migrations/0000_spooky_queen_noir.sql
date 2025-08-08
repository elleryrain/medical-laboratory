CREATE TYPE "public"."role" AS ENUM('admin', 'technician');--> statement-breakpoint
CREATE TABLE "category_technicians" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courier_delivery_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_place" text NOT NULL,
	"finish_place" text NOT NULL,
	"finish_date" timestamp NOT NULL,
	"paid" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL,
	"middle_name" varchar(255) NOT NULL,
	"clinic_name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"avatar" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fitting_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer NOT NULL,
	"technician_id" integer NOT NULL,
	"patient" varchar(255) NOT NULL,
	"type_work_id" integer NOT NULL,
	"finish_date" timestamp NOT NULL,
	"is_finished" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_works" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_category_technicians" (
	"category_technician_id" integer NOT NULL,
	"technician_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL,
	"role" "role",
	"middle_name" varchar(255) NOT NULL,
	"hashed_password" text NOT NULL,
	"avatar" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_work_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"material_cost" numeric(10, 2) NOT NULL,
	"cost" numeric(10, 2) NOT NULL,
	"material" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fitting_steps" ADD CONSTRAINT "fitting_steps_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_technician_id_users_id_fk" FOREIGN KEY ("technician_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_type_work_id_type_works_id_fk" FOREIGN KEY ("type_work_id") REFERENCES "public"."type_works"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category_technicians" ADD CONSTRAINT "user_category_technicians_category_technician_id_category_technicians_id_fk" FOREIGN KEY ("category_technician_id") REFERENCES "public"."category_technicians"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category_technicians" ADD CONSTRAINT "user_category_technicians_technician_id_users_id_fk" FOREIGN KEY ("technician_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_steps" ADD CONSTRAINT "work_steps_type_work_id_type_works_id_fk" FOREIGN KEY ("type_work_id") REFERENCES "public"."type_works"("id") ON DELETE no action ON UPDATE no action;