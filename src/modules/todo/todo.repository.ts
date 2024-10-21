import {
  DataSource,
  DeleteResult,
  Equal,
  Repository,
  UpdateResult,
} from 'typeorm';
import { ToDo } from './entity/todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository extends Repository<ToDo> {
  constructor(private readonly dataSource: DataSource) {
    super(ToDo, dataSource.createEntityManager());
  }
  getAll(): Promise<ToDo[]> {
    return this.find();
  }

  getById(id: string): Promise<ToDo> {
    return this.findOne({ where: { id: Equal(id) }, relations: ['user'] });
  }

  getByUserId(userId: string): Promise<ToDo[]> {
    return this.find({
      where: { user: { id: Equal(userId) } },
      relations: ['user'],
    });
  }

  createTodo(userId: string, todoToCreate: CreateTodoDTO): Promise<ToDo> {
    const todo = this.create({ ...todoToCreate, userId });
    return this.save(todo);
  }

  updateTodo(id: string, todoToUpdate: UpdateTodoDTO): Promise<UpdateResult> {
    return this.update(id, todoToUpdate);
  }

  deleteTodo(id: string): Promise<DeleteResult> {
    return this.softDelete(id);
  }
}
