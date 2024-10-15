import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';

export const MongoConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  port: +config.mongoDb.mongoPort,
  url: config.mongoDb.connectionString,
  database: config.mongoDb.mongoDB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: true,
  autoLoadEntities: true,
};
