// user.router.ts
import { publicProcedure, router } from '../../src/trpc/trpc.router';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/drizzle/schema/schema';
import { userSelectSchema } from '@/drizzle/schema/user.schema';

// http://localhost:5200/trpc/user.byId?input={"id":10}
export const createUserRouter = (db: NodePgDatabase<typeof schema>) => {
  return router({
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

        return userSelectSchema.parse(user);
      }),
  });
};
