import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  index,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { genresTable } from './genre.schema';
import { usersTable } from './user.schema';
import { moviesDetailTable } from './movie-detail.schema';
import { directorsTable } from './director.schema';

export const moviesTable = pgTable(
  'movies',
  {
    id: serial('id').primaryKey(),
    creatorId: integer('creator_id')
      .notNull()
      .references(() => usersTable.id),
    title: varchar('title', { length: 255 }).notNull().unique(),
    detailId: integer('detail_id')
      .unique()
      .references(() => moviesDetailTable.id),
    directorId: integer('director_id')
      .notNull()
      .references(() => directorsTable.id),
    likeCount: integer('like_count').notNull().default(0),
    dislikeCount: integer('dislike_count').notNull().default(0),
    movieFilePath: varchar('movie_file_path', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    version: integer('version').notNull().default(0),
  },
  (table) => [
    index('movies_creator_id_idx').on(table.creatorId),
    index('movies_director_id_idx').on(table.directorId),
    index('movies_detail_id_idx').on(table.detailId),
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

export const movieUserLikeTable = pgTable(
  'movie_user_like',
  {
    movieId: integer('movie_id')
      .notNull()
      .references(() => moviesTable.id),
    userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id),
    isLike: boolean('is_like').notNull().default(true),
  },
  (table) => [primaryKey({ columns: [table.movieId, table.userId] })],
);

export const movieSelectSchema = createSelectSchema(moviesTable);
