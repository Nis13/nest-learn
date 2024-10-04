import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDTO from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getall();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userToCreate: CreateUserDTO): Promise<User> {
    return this.userService.saveUser(userToCreate);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
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
