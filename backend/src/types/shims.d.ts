declare module '@koa/router' {
  import * as Router from 'koa-router';
  export = Router;
}

declare module 'postgres-migrations' {
  export interface BaseDBConfig {
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
  }

  export interface CreateDbConfig extends BaseDBConfig {
    readonly defaultDatabase?: string;
  }

  export interface MigrateDbConfig extends BaseDBConfig {
    readonly database: string;
  }

  export function createDb(dbName: string, dbConfig: CreateDbConfig): Promise<void>;
  export function migrate(dbConfig: MigrateDbConfig, migrationsDirectory: string): Promise<void>;
}
