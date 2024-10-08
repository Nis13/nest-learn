import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: +config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
