import { Pool, PoolClient, QueryResult, types as pgTypes } from 'pg';
import parseDate from 'postgres-date';
import { createDb, migrate } from 'postgres-migrations';

pgTypes.setTypeParser(20, 'text', parseInt); // bigint
pgTypes.setTypeParser(1114, (val) => parseDate(val).getTime()); // timestamp without timezone
pgTypes.setTypeParser(1184, (val) => parseDate(val).getTime()); // timestamp
pgTypes.setTypeParser(1700, 'text', parseFloat); // numeric/decimal

const config = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!
};

const pool = new Pool(config);

interface PublicClient {
  query<T>(text: string, values?: any[]): Promise<QueryResult<T>>;
  getAll<T>(text: string, values?: any[]): Promise<T[]>;
  getOne<T>(text: string, values?: any[]): Promise<T | null>;
}

type QueryFunction<T> = (client: PublicClient) => Promise<T>;

function createPublicClient(pgClient: Pool | PoolClient): PublicClient {
  return {
    query<T>(text: string, values?: any[]): Promise<QueryResult<T>> {
      return pgClient.query(text, values).then((result) => {
        console.log(result);
        return result;
      });
    },

    async getAll<T>(text: string, values?: any[]): Promise<T[]> {
      const result = await this.query<T>(text, values);
      return result.rows;
    },

    async getOne<T>(text: string, values?: any[]): Promise<T | null> {
      const result = await this.query<T>(text, values);
      return result.rows.length >= 1 ? result.rows[0] : null;
    }
  };
}

export default {
  ...createPublicClient(pool),

  async runMigrations(): Promise<void> {
    await createDb(process.env.DB_NAME!, config);
    await migrate(config, 'src/db/migrations');
  },

  async withTransaction<T>(queryFunction: QueryFunction<T>): Promise<T> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await queryFunction(createPublicClient(client));
      await client.query('COMMIT');
      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  stop(): Promise<void> {
    return pool.end();
  }
};
