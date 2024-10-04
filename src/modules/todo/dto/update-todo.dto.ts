import { PartialType } from '@nestjs/swagger';
import { CreateTodoDTO } from './create-todo.dto';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {}
