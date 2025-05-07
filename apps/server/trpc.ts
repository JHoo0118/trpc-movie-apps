import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

// Context type definition
export interface ContextType {
  req: Request;
  res: Response;
  //   user: User | null;
  //   accessToken: string | null;
}

// Context available to all procedures
export type Context = Awaited<ReturnType<typeof createContext>>;

export function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): ContextType {
  return {
    req,
    res,
    // user: null as CurrentUser | null,
    // accessToken: null as string | null,
  };
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// Create protected procedure
const authMiddleware = t.middleware(({ next, ctx }) => {
  //   if (!ctx.user) {
  //     throw new TRPCError({
  //       code: 'UNAUTHORIZED',
  //       message: 'Not authenticated',
  //   });
  // }

  return next({
    ctx: {
      ...ctx,
      //   user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  authMiddleware,
) as typeof t.procedure;

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return 'Hello, world!';
  }),
});

export type AppRouter = typeof appRouter;
