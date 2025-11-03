import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schemas/schema';

export type DB_TYPE = NodePgDatabase<typeof schema>;
