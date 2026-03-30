import { Kysely } from 'kysely';
import { Database } from '../types';
import OracleDB from 'oracledb';
import * as oracledb from 'oracledb';
import { OracleDialect } from 'kysely-oracledb';

const getDatabaseSettings = () => {
  return {
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: 'localhost:1521/XEPDB1',
  };
};

export class KyselyORMOracleDatabase {
  private static instance: KyselyORMOracleDatabase;
  private dbInstance: Kysely<Database> | null = null;

  private constructor() {}

  static getInstance(): KyselyORMOracleDatabase {
    if (!KyselyORMOracleDatabase.instance) {
      KyselyORMOracleDatabase.instance = new KyselyORMOracleDatabase();
    }
    return KyselyORMOracleDatabase.instance;
  }

  async createConnection(config: OracleDB.ConnectionAttributes) {
    const pool = await oracledb.createPool({
      user: config.user,
      password: config.password,
      connectionString: config.connectString,
    });

    const dialect = new OracleDialect({
      pool,
    });

    return new Kysely<Database>({
      dialect,
    });
  }

  async getConnection(): Promise<Kysely<Database>> {
    const databaseSettings = getDatabaseSettings();

    if (!this.dbInstance) {
      this.dbInstance = await this.createConnection(databaseSettings);
    }

    return this.dbInstance;
  }

  async closeConnection(): Promise<void> {
    if (this.dbInstance) {
      await this.dbInstance.destroy();
      this.dbInstance = null;
    }
  }
}
