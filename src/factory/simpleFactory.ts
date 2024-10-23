import { IToDoFactory } from './IToDoFactory';
import { TO_DO_STATUS } from 'src/modules/todo/todo-status.enum';
import { SimpleToDO } from 'src/modules/todo/entity/simple.entity';

export class SimpleFactory implements IToDoFactory {
  createTask(title: string, description: string, userId: string): SimpleToDO {
    const task = new SimpleToDO();
    task.title = title;
    task.userId = userId;
    task.description = description;
    task.status = TO_DO_STATUS.PENDING;
    return task;
  }
}
