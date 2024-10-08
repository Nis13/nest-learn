import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDTO from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { TodoService } from '../todo/todo.service';
import { ToDo } from '../todo/todo.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthMetaData } from 'src/auth.metadata.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService,
  ) {}

  @Get()
  @AuthMetaData('SkipAuthorizationCheck')
  getAll(): Promise<User[]> {
    return this.userService.getall();
  }

  @Get('/todo')
  getTodoOfUser(@Body('userId') userId: string): Promise<ToDo[]> {
    return this.todoService.getByUserId(userId);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  @AuthMetaData('SkipAuthorizationCheck')
  create(@Body() userToCreate: CreateUserDTO): Promise<User> {
    return this.userService.saveUser(userToCreate);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() userToUpdate: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, userToUpdate);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
