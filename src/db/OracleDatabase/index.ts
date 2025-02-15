import OracleDB from 'oracledb';
const oracledb = require('oracledb');

export class OracleDatabase {
  private connection: OracleDB.Connection | null;
  private database_settings: OracleDB.ConnectionAttributes;

  constructor(config: OracleDB.ConnectionAttributes) {
    this.connection = null;
    this.database_settings = config;
  }

  private async connect(
    config: OracleDB.ConnectionAttributes,
  ): Promise<OracleDB.Connection> {
    const conn = await oracledb.getConnection(config);
    if (!conn) throw new Error('Falha ao conectar');

    return conn;
  }

  async execute<T>(
    sql: string,
    bindParams: OracleDB.BindParameters,
    options: OracleDB.ExecuteOptions = {},
  ) {
    if (!this.connection) {
      this.connection = await this.connect(this.database_settings);
    }

    try {
      const data = await this.connection.execute<T>(sql, bindParams, options);
      await this.connection.commit();
      return data;
    } catch (e) {
      console.error(e);
      this.connection.rollback();
      throw new Error(e);
    } finally {
      this.connection.close();
    }
  }
}
