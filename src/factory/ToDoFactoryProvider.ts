import { ToDoOptions } from 'src/constants/Entity';
import { IToDoFactory } from './IToDoFactory';

import { RecurringFactory } from './RecurringFactory';
import { SimpleFactory } from './simpleFactory';

export class ToDoFactoryProvider {
  static getFactory(type: string): IToDoFactory {
    switch (type) {
      case ToDoOptions.SimpleToDo:
        return new SimpleFactory();
      case ToDoOptions.RecurringToDo:
        return new RecurringFactory();
      default:
        throw new Error(`No factory found for type: ${type}`);
    }
  }
}
