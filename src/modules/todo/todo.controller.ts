import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Roles } from 'src/custom-decorators/roles.decorator';

@Controller('todo')
@Roles(['admin'])
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Promise<ToDo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  @Roles(['user'])
  getById(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.getById(id);
  }

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() todoToCreate: CreateTodoDTO,
  ): Promise<ToDo> {
    return this.todoService.create(userId, todoToCreate);
  }

  @Put(':id')
  @Roles(['user'])
  update(
    @Param('id') id: string,
    @Body() todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    return this.todoService.update(id, todoToUpdate);
  }

  @Delete(':id')
  @Roles(['delete'])
  delete(@Param('id') id: string): Promise<string> {
    return this.todoService.delete(id);
  }
}
