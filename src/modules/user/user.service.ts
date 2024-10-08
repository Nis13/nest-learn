import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  SERVICE: string = UserService.name;

  getall(): Promise<User[]> {
    this.logger.log('Fetching all the users', this.SERVICE);
    return this.userRepository.getAll();
  }

  getById(id: string): Promise<User> {
    this.logger.log(`Getting the user of Id: ${id}`);
    return this.userRepository.getById(id);
  }

  async getByName(name: string): Promise<User> {
    this.logger.log(`Getting the user of name: ${name}`, this.SERVICE);
    const user = await this.userRepository.getByName(name);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async saveUser(userToCreate: CreateUserDTO): Promise<User> {
    this.logger.log(`creating user with name: ${userToCreate.name}`);
    const password = await bcrypt.hash(userToCreate.password, 10);
    return this.userRepository.saveUser({
      ...userToCreate,
      password: password,
    });
  }

  update(id: string, userToUpdate: UpdateUserDTO): Promise<User> {
    this.logger.log(`Updating the user of Id: ${id}`);
    return this.userRepository.updateUser(id, userToUpdate);
  }

  async delete(id: string): Promise<string> {
    this.logger.log(`Deleting the user of Id: ${id}`);
    if ((await this.userRepository.deleteUser(id)).affected == 1) {
      return EXCEPTION_MESSAGE.DELETION_SUCCESSFULL;
    }
    return EXCEPTION_MESSAGE.NOT_DELETED;
  }
}
