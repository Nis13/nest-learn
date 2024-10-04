import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ToDo } from './todo.entity';
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
    return this.findOneBy({ id: id });
  }

  getByUserId(userId: string): Promise<ToDo> {
    return this.findOne({
      where: { users: { id: userId } },
      relations: ['user'],
    });
  }

  createTodo(todoToCreate: CreateTodoDTO): Promise<ToDo> {
    const todo = this.create(todoToCreate);
    return this.save(todo);
  }

  updateTodo(id: string, todoToUpdate: UpdateTodoDTO): Promise<UpdateResult> {
    return this.update(id, todoToUpdate);
  }

  deleteTodo(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
