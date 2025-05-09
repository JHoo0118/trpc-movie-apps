// import { publicProcedure, router } from '../../trpc';
// import { z } from 'zod';
// import { genreSelectSchema } from './model';
// import { TRPCError } from '@trpc/server';
// import { genresTable } from './model';
// import { genreValidationSchema } from '@movie-apps/schema/genre';
// import { DEFAULT_LIMIT } from '../../src/utils/constants';
// import db from '../../database';

// type Cursor = {
//   id: number;
//   createdAt: Date;
// };

// const encodeCursor = (cursor: Cursor): string => {
//   return Buffer.from(
//     JSON.stringify({
//       id: cursor.id,
//       createdAt: cursor.createdAt.toISOString(),
//     }),
//   ).toString('base64');
// };

// const decodeCursor = (cursor: string): Cursor => {
//   const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
//   return {
//     id: decoded.id,
//     createdAt: new Date(decoded.createdAt as string),
//   };
// };

// export const genreRouter = router({
//   list: publicProcedure
//     .input(
//       z.object({
//         limit: z.number().optional(),
//         cursor: z.string().optional(),
//         isPreviousPage: z.boolean().optional(),
//       }),
//     )
//     .output(
//       z.object({
//         genres: z.array(
//           genreSelectSchema.extend({
//             id: z.number(),
//             name: z.string(),
//             createdAt: z.date(),
//             updatedAt: z.date(),
//           }),
//         ),
//         nextCursor: z.string().optional(),
//         previousCursor: z.string().optional(),
//       }),
//     )
//     .query(async ({ input }) => {
//       const limit = input?.limit ?? DEFAULT_LIMIT;
//       const isPreviousPage = input.isPreviousPage ?? false;

//       let query = db.query.genresTable.findMany({
//         limit,
//         orderBy: (genres, { desc, asc }) => [
//           isPreviousPage ? asc(genres.createdAt) : desc(genres.createdAt),
//         ],
//       });

//       if (input.cursor) {
//         const cursor = decodeCursor(input.cursor);
//         query = db.query.genresTable.findMany({
//           limit,
//           where: (genres, { and, gt, lt, eq }) =>
//             and(
//               isPreviousPage
//                 ? gt(genres.createdAt, cursor.createdAt)
//                 : lt(genres.createdAt, cursor.createdAt),
//               eq(genres.id, cursor.id),
//             ),
//           orderBy: (genres, { desc, asc }) => [
//             isPreviousPage ? asc(genres.createdAt) : desc(genres.createdAt),
//           ],
//         });
//       }

//       const results = await query;

//       const nextCursor =
//         results.length > 0
//           ? encodeCursor({
//               id: results[results.length - 1].id,
//               createdAt: results[results.length - 1].createdAt,
//             })
//           : undefined;

//       const previousCursor =
//         results.length > 0
//           ? encodeCursor({
//               id: results[0].id,
//               createdAt: results[0].createdAt,
//             })
//           : undefined;

//       return {
//         genres: results,
//         nextCursor: isPreviousPage ? previousCursor : nextCursor,
//         previousCursor: isPreviousPage ? nextCursor : previousCursor,
//       };
//     }),
//   byId: publicProcedure
//     .input(z.object({ id: z.number() }))
//     .output(genreSelectSchema)
//     .query(async ({ input }) => {
//       const genre = await db.query.genresTable.findFirst({
//         where: (genres, { eq }) => eq(genres.id, input.id),
//       });

//       if (!genre) {
//         throw new TRPCError({ code: 'NOT_FOUND', message: 'Genre not found' });
//       }

//       const validatedGenre = genreSelectSchema.parse(genre);
//       return validatedGenre;
//     }),

//   //   add: protectedProcedure
//   add: publicProcedure
//     .input(genreValidationSchema)
//     .mutation(async ({ ctx, input }) => {
//       console.log(ctx);
//       const genre = await db
//         .insert(genresTable)
//         .values({
//           name: input.name,
//         })
//         .returning();

//       return genre[0];
//     }),
// });
