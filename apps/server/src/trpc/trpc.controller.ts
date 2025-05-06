import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext, appRouter } from 'trpc';

@Controller('trpc')
export class TrpcController {
  @All('*')
  async handle(@Req() req: Request, @Res() res: Response) {
    const middleware = createExpressMiddleware({
      router: appRouter,
      createContext: () => createContext({ req, res }),
    });

    return middleware(req, res, () => {});
  }
}
