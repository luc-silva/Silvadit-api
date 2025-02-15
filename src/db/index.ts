import OracleDB from 'oracledb';
import { OracleDatabase } from './OracleDatabase';
import { OracleDevConfig, OracleHmlConfig, OraclePrdConfig } from './config';

const getDatabaseSettings = (enviromment: IEnviromentEnum) => {
  const settings = {
    [IEnviromentEnum.DEV]: new OracleDevConfig(),
    [IEnviromentEnum.HML]: new OracleHmlConfig(),
    [IEnviromentEnum.PRD]: new OraclePrdConfig(),
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
