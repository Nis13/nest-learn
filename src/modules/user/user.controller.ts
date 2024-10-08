import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDTO from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { TodoService } from '../todo/todo.service';
import { ToDo } from '../todo/todo.entity';
import { AuthMetaData } from 'src/custom-decorators/auth.metadata.decorator';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { SKIP_AUTHORIZATION_CHECK } from 'src/constants/metadata-key.constants';

@Controller('user')
@Roles(['admin'])
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService,
  ) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getall();
  }

  @Get('/todo')
  @Roles(['user'])
  getTodoOfUser(@Body('userId') userId: string): Promise<ToDo[]> {
    return this.todoService.getByUserId(userId);
  }

  @Get('/:id')
  @Roles(['user'])
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  @AuthMetaData(SKIP_AUTHORIZATION_CHECK)
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
