import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
import path from 'path';

config();
const schemaPath = path.join(
  __dirname,
  'src',
  'drizzle',
  'schemas',
  'schema.ts',
);

const migrationsPath = path.join(__dirname, 'src', 'drizzle', 'migrations');

console.log(schemaPath);
export default {
  dialect: 'postgresql',
  schema: schemaPath,
  out: migrationsPath,

  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
} satisfies Config;
