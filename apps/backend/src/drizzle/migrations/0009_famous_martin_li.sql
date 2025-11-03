CREATE TABLE "material_types_instances" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"strenth" integer NOT NULL,
	"currentStrenth" integer NOT NULL,
	"materialTypeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "material_types_instances" ADD CONSTRAINT "material_types_instances_materialTypeId_material_types_id_fk" FOREIGN KEY ("materialTypeId") REFERENCES "public"."material_types"("id") ON DELETE no action ON UPDATE no action;