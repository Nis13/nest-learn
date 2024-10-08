import { Injectable, Logger } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import { isAffected } from 'src/utils/check_affected';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly logger: Logger,
  ) {}

  getAll(): Promise<ToDo[]> {
    this.logger.log('Fetching all the todos');
    return this.todoRepository.getAll();
  }

  getById(id: string): Promise<ToDo> {
    this.logger.log(`Getting the todo with Id: ${id}`);
    return this.todoRepository.getById(id);
  }

  getByUserId(userId: string): Promise<ToDo[]> {
    this.logger.log(`Getting the todos of user of Id: ${userId}`);
    return this.todoRepository.getByUserId(userId);
  }

  create(userId: string, todoToCreate: CreateTodoDTO): Promise<ToDo> {
    this.logger.log(
      `Creating the todo with title: ${todoToCreate.title} of user of Id: ${userId} `,
    );
    return this.todoRepository.createTodo(userId, todoToCreate);
  }

  async update(
    id: string,
    todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    this.logger.log(`Updating the Todo of Id: ${id}`);
    const result = await this.todoRepository.updateTodo(id, todoToUpdate);
    if (result.affected > 0) {
      return this.getById(id);
    }
    return EXCEPTION_MESSAGE.NOT_UPDATED;
  }

  async delete(id: string): Promise<string> {
    this.logger.log(`Deleting the todo of Id: ${id}`);
    const result = await this.todoRepository.deleteTodo(id);
    if (!isAffected(result)) {
      this.logger.warn(`The todo of Id: ${id} couldn't be deleted`);
      return EXCEPTION_MESSAGE.NOT_DELETED;
    }
    return EXCEPTION_MESSAGE.DELETION_SUCCESSFULL;
  }
}
