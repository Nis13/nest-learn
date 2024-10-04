import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import { isAffected } from 'src/utils/check_affected';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getAll(): Promise<ToDo[]> {
    return this.todoRepository.getAll();
  }

  getById(id: string): Promise<ToDo> {
    return this.todoRepository.getById(id);
  }

  getByUserId(userId: string): Promise<ToDo[]> {
    return this.todoRepository.getByUserId(userId);
  }

  create(userId: string, todoToCreate: CreateTodoDTO): Promise<ToDo> {
    return this.todoRepository.createTodo(userId, todoToCreate);
  }

  async update(
    id: string,
    todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    const result = await this.todoRepository.updateTodo(id, todoToUpdate);
    if (result.affected > 0) {
      return this.getById(id);
    }
    return EXCEPTION_MESSAGE.NOT_UPDATED;
  }

  async delete(id: string): Promise<string> {
    const result = await this.todoRepository.deleteTodo(id);
    if (!isAffected(result)) {
      return EXCEPTION_MESSAGE.NOT_DELETED;
    }
    return EXCEPTION_MESSAGE.DELETION_SUCCESSFULL;
  }
}
