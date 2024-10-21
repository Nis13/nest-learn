import { ToDo } from 'src/modules/todo/entity/todo.entity';
import { IToDoFactory } from './IToDoFactory';
import { TO_DO_STATUS } from 'src/modules/todo/todo-status.enum';

export class SimpleFactory implements IToDoFactory {
  createTask(title: string, userId: string): ToDo {
    const task = new ToDo();
    task.title = title;
    task.userId = userId;
    task.status = TO_DO_STATUS.PENDING;
    return task;
  }
}
