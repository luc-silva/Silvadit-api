import OracleDB from 'oracledb';

export class OracleDevConfig implements OracleDB.ConnectionAttributes {
  user = process.env.ORACLEDB_USER;
  password = process.env.ORACLEDB_PASSWORD;
  connectString = 'localhost:1521/XEPDB1';
}

export class OracleHmlConfig implements OracleDB.ConnectionAttributes {
  user = process.env.ORACLEDB_USER;
  password = process.env.ORACLEDB_PASSWORD;
  connectString = 'localhost:1521/XEPDB1';
}

export class OraclePrdConfig implements OracleDB.ConnectionAttributes {
  user = process.env.ORACLEDB_USER;
  password = process.env.ORACLEDB_PASSWORD;
  connectString = 'localhost:1521/XEPDB1';
}
