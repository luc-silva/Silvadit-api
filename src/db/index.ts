import OracleDB from 'oracledb';
import { OracleDatabase } from './OracleDatabase';

const getDatabaseSettings = (enviromment: IEnviromentEnum) => {
  const settings = {
    [IEnviromentEnum.DEV]: {
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: 'localhost:1521/XEPDB1',
    },
    [IEnviromentEnum.HML]: {
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: 'localhost:1521/XEPDB1',
    },
    [IEnviromentEnum.PRD]: {
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: 'localhost:1521/XEPDB1',
    },
  };

  return settings[enviromment];
};

export const getConnection = async (): Promise<OracleDatabase> => {
  const enviroment = (process.env.APP_ENV?.toLocaleLowerCase() ||
    'dev') as IEnviromentEnum;

  const databaseSettings = getDatabaseSettings(enviroment);

  const database = new OracleDatabase(databaseSettings);
  
  return database;
};
