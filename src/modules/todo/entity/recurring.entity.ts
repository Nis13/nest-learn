import { RecurringFrequency } from 'src/constants/recurringTime.enum';
import { Column, Entity } from 'typeorm';
import { ToDo } from './todo.entity';

@Entity('todo')
export class RecurringToDo extends ToDo {
  @Column({
    type: 'enum',
    enum: RecurringFrequency,
    default: RecurringFrequency.NONE,
  })
  frequency: RecurringFrequency;
}
