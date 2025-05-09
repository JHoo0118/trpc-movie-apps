import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DRIZZLE } from './drizzle/drizzle.module';
import { createAppRouter, createContext } from './trpc/trpc.router';
import * as trpcExpress from '@trpc/server/adapters/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const db = app.get(DRIZZLE); // Nest의 DI 컨테이너에서 db 꺼냄

  const appRouter = createAppRouter(db); // db 주입
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }) => createContext({ req, res, db }),
    }),
  );
  // CORS 설정
  // app.enableCors({
  //   origin: [process.env.CLIENT_HOST], // 클라이언트 URL
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   credentials: true,
  // });

  await app.listen(process.env.PORT ?? 5200);
}
bootstrap();
