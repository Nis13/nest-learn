import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { AuthMetaData } from 'src/custom-decorators/auth.metadata.decorator';
import { AUTHENTICATE } from 'src/constants/metadata-key.constants';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin'])
  getAll(): Promise<ToDo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  getById(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.getById(id);
  }

  @Post()
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  create(
    @Request() request,
    @Body() todoToCreate: CreateTodoDTO,
  ): Promise<ToDo> {
    console.log('here');
    return this.todoService.create(request.user.sub, todoToCreate);
  }

  @Put(':id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  update(
    @Param('id') id: string,
    @Body() todoToUpdate: UpdateTodoDTO,
  ): Promise<ToDo | string> {
    return this.todoService.update(id, todoToUpdate);
  }

  @Delete(':id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  delete(@Param('id') id: string): Promise<string> {
    return this.todoService.delete(id);
  }
}
