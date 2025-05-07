import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  index,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { genresTable } from '../genre/model';
import { usersTable } from '../user/models';

export const moviesTable = pgTable(
  'movies',
  {
    id: serial('id').primaryKey(),
    creatorId: integer('creator_id')
      .notNull()
      .references(() => usersTable.id),
    title: varchar('title', { length: 255 }).notNull().unique(),
    directorId: integer('director_id')
      .notNull()
      .references(() => usersTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    version: integer('version').notNull().default(0),
  },
  (table) => [
    index('movies_creator_id_idx').on(table.creatorId),
    index('movies_director_id_idx').on(table.directorId),
  ],
);

export const moviesToGenresTable = pgTable(
  'movies_to_genres',
  {
    movieId: integer('movie_id')
      .notNull()
      .references(() => moviesTable.id),
    genreId: integer('genre_id')
      .notNull()
      .references(() => genresTable.id),
  },
  (table) => [
    index('movies_to_genres_movie_id_idx').on(table.movieId),
    index('movies_to_genres_genre_id_idx').on(table.genreId),
  ],
);

export const movieSelectSchema = createSelectSchema(moviesTable);
