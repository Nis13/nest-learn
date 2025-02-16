import { IsEnum, IsString } from 'class-validator';
import { TO_DO_STATUS } from '../todo-status.enum';

export class CreateTodoDTO {
  @IsString()
  title: string;

  @IsEnum(TO_DO_STATUS)
  status: TO_DO_STATUS;
}
