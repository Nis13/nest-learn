import { IToDoFactory } from './IToDoFactory';
import { TO_DO_STATUS } from 'src/modules/todo/todo-status.enum';
import { RecurringFrequency } from 'src/constants/recurringTime.enum';
import { RecurringToDo } from 'src/modules/todo/entity/recurring.entity';
import { ToDo } from 'src/modules/todo/entity/todo.entity';

export class RecurringFactory implements IToDoFactory {
  createTask(
    title: string,
    userId: string,
    frequency?: RecurringFrequency,
  ): ToDo {
    const task = new RecurringToDo();
    task.title = title;
    task.userId = userId;
    task.status = TO_DO_STATUS.PENDING;
    task.frequency = frequency;
    return task;
  }
}
