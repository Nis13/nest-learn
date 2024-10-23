import { ToDo } from 'src/modules/todo/entity/todo.entity';

export interface IToDoFactory {
  createTask(
    title: string,
    description: string,
    userId: string,
    extraData?: any,
  ): ToDo;
}
