import { MongoModule } from './../../database/mongo.module';
import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository.mongo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TodoModule } from '../todo/todo.module';

@Module({
  controllers: [UserController],
  imports: [MongoModule, TypeOrmModule.forFeature([User]), TodoModule],
  providers: [UserRepository, UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
