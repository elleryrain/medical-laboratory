import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'technician']);

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  email: varchar('email').unique().notNull(),
  role: roleEnum(),
  middleName: varchar('middle_name', { length: 255 }).notNull(),
  hashedPassword: text('hashed_password').notNull(),
  avatar: text('avatar'),
});

export const categoryTechniciansTable = pgTable('category_technicians', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
});

export const userCategoryTechniciansTable = pgTable(
  'user_category_technicians',
  {
    categoryTechnicianId: integer('category_technician_id')
      .references(() => categoryTechniciansTable.id)
      .notNull(),
    technicianId: integer('technician_id')
      .references(() => usersTable.id)
      .notNull(),
  },
);

export const typeWorksTable = pgTable('type_works', {
  id: serial('id').primaryKey(),
  image: text('image').notNull(),
});

export const workStepsTable = pgTable('work_steps', {
  id: serial('id').primaryKey(),
  typeWorkId: integer('type_work_id')
    .references(() => typeWorksTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  materialCost: numeric('material_cost', { precision: 10, scale: 2 }).notNull(),
  cost: numeric('cost', { precision: 10, scale: 2 }).notNull(),
  material: text('material').notNull(),
});

export const doctorsTable = pgTable('doctors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  middleName: varchar('middle_name', { length: 255 }).notNull(),
  clinicName: varchar('clinic_name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  avatar: text('avatar').notNull(),
});

export const courierDeliveryTasksTable = pgTable('courier_delivery_tasks', {
  id: serial('id').primaryKey(),
  startPlaceId: integer('start_place_id')
    .notNull()
    .references(() => deliveryPlacesTable.id),
  finishPlaceId: integer('finish_place_id')
    .notNull()
    .references(() => deliveryPlacesTable.id),
  finishDate: timestamp('finish_date').notNull(),
  serviceId: integer('service_id').references(() => servicesTable.id),
  courierName: varchar('courier_name', { length: 100 }).notNull(),
  paid: boolean('paid').notNull(),
});

export const deliveryPlacesTable = pgTable('delivery_place', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const servicesTable = pgTable('services', {
  id: serial('id').primaryKey(),
  doctorId: integer('doctor_id')
    .references(() => doctorsTable.id)
    .notNull(),
  technicianId: integer('technician_id')
    .references(() => usersTable.id)
    .notNull(),
  patient: varchar('patient', { length: 255 }).notNull(),
  typeWorkId: integer('type_work_id')
    .references(() => typeWorksTable.id)
    .notNull(),
  finishDate: timestamp('finish_date').notNull(),
  isFinished: boolean('is_finished').notNull(),
});

export const fittingStepsTable = pgTable('fitting_steps', {
  id: serial('id').primaryKey(),
  serviceId: integer('service_id')
    .references(() => servicesTable.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});
