import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './database/schema.ts',
  out: './sql/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
