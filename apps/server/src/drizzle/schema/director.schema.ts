import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const directorsTable = pgTable('directors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  dob: timestamp('dob').notNull(),
  nationality: varchar('nationality', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const directorSelectSchema = createSelectSchema(directorsTable);
