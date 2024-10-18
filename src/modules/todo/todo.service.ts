import { Injectable, Logger } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import { isAffected } from 'src/utils/check_affected';
import ENTITY_NAME from 'src/constants/Entity';
import { NotFoundException } from 'src/error-handlers/not-found.exception';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly logger: Logger,
  ) {}

  service: string = 'ToDOService';
  entityName: string = ENTITY_NAME.TODO;

  getAll(): Promise<ToDo[]> {
    this.logger.log('Fetching all the todos', this.service);
    return this.todoRepository.getAll();
  }

  async getById(id: string): Promise<ToDo> {
    this.logger.log(`Getting the todo with Id: ${id}`, this.service);
    const todo = await this.todoRepository.getById(id);
    console.log(todo);
    if (!todo) {
      throw new NotFoundException(
        EXCEPTION_MESSAGE.ENTITY_NOT_FOUND(this.entityName, id),
      );
    }
    return todo;
  }

  getByUserId(userId: string): Promise<ToDo[]> {
    this.logger.log(`Getting the todos of user of Id: ${userId}`, this.service);
    return this.todoRepository.getByUserId(userId);
  }

  create(userId: string, todoToCreate: CreateTodoDTO): Promise<ToDo> {
    this.logger.log(
      `Creating the todo with title: ${todoToCreate.title} of user of Id: ${userId} `,
      this.service,
    );
    return this.todoRepository.createTodo(userId, todoToCreate);
  }

  async update(
    id: string,
    todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    this.logger.log(`Updating the Todo of Id: ${id}`, this.service);
    const result = await this.todoRepository.updateTodo(id, todoToUpdate);
    if (result.affected > 0) {
      return this.getById(id);
    }
    return EXCEPTION_MESSAGE.UPDATE_FAILED(this.entityName, id);
  }

  async delete(id: string): Promise<string> {
    this.logger.log(`Deleting the todo of Id: ${id}`, this.service);
    const result = await this.todoRepository.deleteTodo(id);
    if (!isAffected(result)) {
      this.logger.warn(`The todo of Id: ${id} couldn't be deleted`);
      return EXCEPTION_MESSAGE.DELETION_FAILED(this.entityName, id);
    }
    return EXCEPTION_MESSAGE.ENTITY_DELETED(this.entityName, id);
  }
}
