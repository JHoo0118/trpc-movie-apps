import { publicProcedure, router } from '../../trpc';
import { z } from 'zod';
import { userSelectSchema } from './models';
import db from 'database';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(userSelectSchema)
    .query(async ({ input }) => {
      const user = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, input.id),
      });

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      }

      const validatedUser = userSelectSchema.parse(user);
      return validatedUser;
    }),
});
