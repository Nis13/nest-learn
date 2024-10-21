import { IToDoFactory } from './IToDoFactory';

import { RecurringFactory } from './RecurringFactory';
import { SimpleFactory } from './simpleFactory';

export class ToDoFactoryProvider {
  static getFactory(type: string): IToDoFactory {
    switch (type) {
      case 'basic':
        return new SimpleFactory();
      case 'recurring':
        return new RecurringFactory();
      default:
        throw new Error(`No factory found for type: ${type}`);
    }
  }
}
