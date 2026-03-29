import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Database = ReturnType<typeof drizzle<typeof schema>>;
let dbInstance: Database | undefined;

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      'Missing DATABASE_URL environment variable. Configure it before using the database.',
    );
  }

  const sql = neon(databaseUrl);
  dbInstance = drizzle({ client: sql, schema });
  return dbInstance;
}
