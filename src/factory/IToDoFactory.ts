import { ToDo } from 'src/modules/todo/entity/todo.entity';

export interface IToDoFactory {
  createTask(title: string, description: string, extraData?: any): ToDo;
}
