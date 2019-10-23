import { Pool, QueryResult } from 'pg';
import { createDb, migrate } from 'postgres-migrations';

const config = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!
};

const pool = new Pool(config);

export default {
  async runMigrations(): Promise<void> {
    await createDb(process.env.DB_NAME!, config);
    await migrate(config, 'src/db/migrations');
  },

  query<T>(text: string, values?: any[]): Promise<QueryResult<T>> {
    return pool.query(text, values);
  },

  stop(): Promise<void> {
    return pool.end();
  }
};
