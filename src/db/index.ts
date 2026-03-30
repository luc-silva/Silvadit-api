import { OracleDatabase } from './OracleDatabase';

const getDatabaseSettings = () => {
  return {
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: 'localhost:1521/XEPDB1',
  };
};

export const getConnection = async (): Promise<OracleDatabase> => {
  const databaseSettings = getDatabaseSettings();

  const database = new OracleDatabase(databaseSettings);

  return database;
};
