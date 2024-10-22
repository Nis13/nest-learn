import { RecurringFrequency } from 'src/constants/recurringTime.enum';
import { ChildEntity, Column } from 'typeorm';
import { ToDo } from './todo.entity';
import { ToDoOptions } from 'src/constants/Entity';

@ChildEntity(ToDoOptions.RecurringToDo)
export class RecurringToDo extends ToDo {
  @Column({
    type: 'enum',
    enum: RecurringFrequency,
  })
  frequency: RecurringFrequency;
}
