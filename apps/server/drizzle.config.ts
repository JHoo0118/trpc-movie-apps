import { defineConfig } from 'drizzle-kit';

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export default defineConfig({
  schema: './src/drizzle/schema/schema.ts',
  out: './sql/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: parseInt(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  },
});
