import { relations } from 'drizzle-orm';
import {
  genresTable,
  usersTable,
  moviesTable,
  moviesToGenresTable,
  moviesDetailTable,
  movieUserLikeTable,
  directorsTable,
  chatsTable,
  chatRoomsTable,
  chatRoomUsersTable,
} from '../schema/schema';

// Movie relations
export const moviesRelations = relations(moviesTable, ({ one, many }) => ({
  creator: one(usersTable, {
    fields: [moviesTable.creatorId],
    references: [usersTable.id],
  }),
  detail: one(moviesDetailTable, {
    fields: [moviesTable.detailId],
    references: [moviesDetailTable.id],
  }),
  director: one(directorsTable, {
    fields: [moviesTable.directorId],
    references: [directorsTable.id],
  }),
  genres: many(moviesToGenresTable),
  likedUsers: many(movieUserLikeTable),
}));

// Genre relations
export const genresRelations = relations(genresTable, ({ many }) => ({
  movies: many(moviesToGenresTable),
}));

// MoviesToGenres relations
export const moviesToGenresRelations = relations(
  moviesToGenresTable,
  ({ one }) => ({
    movie: one(moviesTable, {
      fields: [moviesToGenresTable.movieId],
      references: [moviesTable.id],
    }),
    genre: one(genresTable, {
      fields: [moviesToGenresTable.genreId],
      references: [genresTable.id],
    }),
  }),
);

// User relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  createdMovies: many(moviesTable, { relationName: 'creator' }),
  likedMovies: many(movieUserLikeTable),
  chats: many(chatsTable),
  chatRooms: many(chatRoomUsersTable),
}));

// MovieUserLike relations
export const movieUserLikeRelations = relations(
  movieUserLikeTable,
  ({ one }) => ({
    movie: one(moviesTable, {
      fields: [movieUserLikeTable.movieId],
      references: [moviesTable.id],
    }),
    user: one(usersTable, {
      fields: [movieUserLikeTable.userId],
      references: [usersTable.id],
    }),
  }),
);

// Director relations
export const directorsRelations = relations(directorsTable, ({ many }) => ({
  movies: many(moviesTable),
}));

// Chat relations
export const chatsRelations = relations(chatsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [chatsTable.authorId],
    references: [usersTable.id],
  }),
  chatRoom: one(chatRoomsTable, {
    fields: [chatsTable.chatRoomId],
    references: [chatRoomsTable.id],
  }),
}));

// ChatRoom relations
export const chatRoomsRelations = relations(chatRoomsTable, ({ many }) => ({
  chats: many(chatsTable),
  users: many(chatRoomUsersTable),
}));

// ChatRoomUsers relations
export const chatRoomUsersRelations = relations(
  chatRoomUsersTable,
  ({ one }) => ({
    chatRoom: one(chatRoomsTable, {
      fields: [chatRoomUsersTable.chatRoomId],
      references: [chatRoomsTable.id],
    }),
    user: one(usersTable, {
      fields: [chatRoomUsersTable.userId],
      references: [usersTable.id],
    }),
  }),
);
