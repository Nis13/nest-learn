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

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Promise<ToDo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
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
  update(
    @Param('id') id: string,
    @Body() todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    return this.todoService.update(id, todoToUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.todoService.delete(id);
  }
}
