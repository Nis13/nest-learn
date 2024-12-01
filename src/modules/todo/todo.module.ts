import { Logger, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository.mongo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, Logger],
  imports: [TypeOrmModule.forFeature([ToDo])],
  exports: [TodoService],
})
export class TodoModule {}
