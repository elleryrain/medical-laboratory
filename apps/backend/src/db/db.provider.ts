import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schemas/schema';
import { DB_TYPE } from './db.type';
export const DB_PROVIDER = 'DB_PROVIDER';
export const dbProvider = [
  {
    provide: DB_PROVIDER,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');
      const pool = new Pool({ connectionString });
      return drizzle(pool, { schema }) as DB_TYPE;
    },
  },
];
