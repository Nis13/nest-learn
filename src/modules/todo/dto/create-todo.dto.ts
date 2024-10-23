import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TO_DO_STATUS } from '../todo-status.enum';
import { RecurringFrequency } from 'src/constants/recurringTime.enum';

export class CreateTodoDTO {
  @IsString()
  title: string;

  @IsEnum(TO_DO_STATUS)
  status: TO_DO_STATUS;

  @IsString()
  description: string;

  @IsOptional()
  frequency?: RecurringFrequency;
}
