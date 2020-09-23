import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

interface IDbConfig {
  type: 'mysql',
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
}

const dbConfig: IDbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDM_HOST || dbConfig.host,
  port: parseInt(process.env.RDM_PORT, 10) || dbConfig.port,
  username: process.env.RDM_USERNAME || dbConfig.username,
  password: process.env.RDM_PASSWORD || dbConfig.password,
  database: process.env.RDM_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  cache: {
    type: 'redis',
    duration: 10000,
  },
  logging: true
};