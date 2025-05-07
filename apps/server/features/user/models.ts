import { createSelectSchema } from 'drizzle-zod';
import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const roles = pgEnum('role', ['admin', 'paidUser', 'user']);

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: roles('role').default('user'),
});

export const userSelectSchema = createSelectSchema(usersTable);
