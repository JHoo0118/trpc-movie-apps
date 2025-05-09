import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { usersTable } from './user.schema';

export const chatRoomsTable = pgTable('chat_rooms', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const chatsTable = pgTable('chats', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id')
    .notNull()
    .references(() => usersTable.id),
  message: varchar('message', { length: 1000 }).notNull(),
  chatRoomId: integer('chat_room_id')
    .notNull()
    .references(() => chatRoomsTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const chatRoomUsersTable = pgTable('chat_room_users', {
  chatRoomId: integer('chat_room_id')
    .notNull()
    .references(() => chatRoomsTable.id),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
});

export const chatSelectSchema = createSelectSchema(chatsTable);
export const chatRoomSelectSchema = createSelectSchema(chatRoomsTable);
