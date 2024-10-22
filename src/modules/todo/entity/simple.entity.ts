import { ChildEntity } from 'typeorm';
import { ToDo } from './todo.entity';
import { ToDoOptions } from 'src/constants/Entity';

@ChildEntity(ToDoOptions.SimpleToDo)
export class SimpleToDO extends ToDo {}
