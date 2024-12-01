import { DataSource, MongoRepository } from 'typeorm';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { toObjectId } from 'src/utils/toObjectId';
import { Injectable } from '@nestjs/common';
import { Document } from 'mongodb';

@Injectable()
export class TodoRepository extends MongoRepository<ToDo> {
  constructor(private readonly dataSource: DataSource) {
    super(ToDo, dataSource.createEntityManager());
  }
  getAll(): Promise<ToDo[]> {
    return this.find();
  }

  getById(id: string): Promise<ToDo> {
    return this.findOneBy({
      where: { _id: toObjectId(id) },
      relations: ['user'],
    });
  }

  getByUserId(userId: string): Promise<ToDo[]> {
    return this.find({
      where: { user: { id: { $eq: toObjectId(userId) } } },
      relations: ['user'],
    });
  }

  createTodo(userId: string, todoToCreate: CreateTodoDTO): Promise<ToDo> {
    console.log(userId);
    const todo = { ...todoToCreate, userId: toObjectId(userId) };
    return this.save(todo);
  }

  updateTodo(id: string, todoToUpdate: UpdateTodoDTO): Promise<Document> {
    return this.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: todoToUpdate },
      { returnDocument: 'after' },
    );
  }

  deleteTodo(id: string): Promise<Document> {
    return this.findOneAndDelete({ _id: toObjectId(id) });
  }
}
