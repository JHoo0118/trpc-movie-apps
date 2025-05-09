import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const moviesDetailTable = pgTable('movies_detail', {
  id: serial('id').primaryKey(),
  detail: text('detail').notNull(),
});
