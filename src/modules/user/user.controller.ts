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
import { UserService } from './user.service';
import CreateUserDTO from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { TodoService } from '../todo/todo.service';
import { ToDo } from '../todo/todo.entity';
import { AuthMetaData } from 'src/custom-decorators/auth.metadata.decorator';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { AUTHENTICATE } from 'src/constants/metadata-key.constants';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService,
  ) {}

  @Get()
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin'])
  getAll(): Promise<User[]> {
    return this.userService.getall();
  }

  @Get('/todo')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  getTodoOfUser(@Request() request): Promise<ToDo[]> {
    return this.todoService.getByUserId(request.user.sub);
  }

  @Get('/profile')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  getProfile(@Request() request): Promise<User> {
    console.log(request);
    return this.userService.getById(request.user.sub);
  }

  @Get('/:id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() userToCreate: CreateUserDTO): Promise<User> {
    return this.userService.saveUser(userToCreate);
  }

  @Put('/:id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  update(
    @Param('id') id: string,
    @Body() userToUpdate: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, userToUpdate);
  }

  @Delete('/:id')
  @AuthMetaData(AUTHENTICATE)
  @Roles(['admin', 'user'])
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
