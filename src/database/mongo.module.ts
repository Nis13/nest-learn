import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: +config.mongoDb.mongoPort,
      url: config.mongoDb.connectionString,
      database: config.mongoDb.mongoDB,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      logging: true,
      autoLoadEntities: true,
    }),
  ],
})
export class MongoModule {}
