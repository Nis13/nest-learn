import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository.mongo';
import { User } from './user.entity';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import * as bcrypt from 'bcrypt';
import ENTITY_NAME from 'src/constants/Entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  SERVICE: string = UserService.name;
  entityName: string = ENTITY_NAME.USER;

  getall(): Promise<User[]> {
    this.logger.log('Fetching all the users', this.SERVICE);
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<User> {
    this.logger.log(`Getting the user of Id: ${id}`);
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException(`User of Id:${id} not found`);
    }
    return user;
  }

  async getByName(name: string): Promise<User> {
    this.logger.log(`Getting the user of name: ${name}`, this.SERVICE);
    const user = await this.userRepository.getByName(name);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(userToCreate: CreateUserDTO): Promise<User> {
    this.logger.log(`creating user with name: ${userToCreate.name}`);
    const password = await this.encryptPassword(userToCreate.password);
    return await this.userRepository.createUser({
      ...userToCreate,
      password: password,
    });
  }

  async update(id: string, userToUpdate: UpdateUserDTO): Promise<User> {
    this.logger.log(`Updating the user of Id: ${id}`, this.SERVICE);
    if (userToUpdate.password) {
      userToUpdate.password = await this.encryptPassword(userToUpdate.password);
    }
    const updatedResult = await this.userRepository.updateUser(
      id,
      userToUpdate,
    );
    if (!updatedResult.value) {
      throw new NotFoundException(
        EXCEPTION_MESSAGE.UPDATE_FAILED(this.entityName, id),
      );
    }
    return updatedResult.value;
  }

  async delete(id: string): Promise<string> {
    this.logger.log(`Deleting the user of Id: ${id}`);
    const deletedResult = await this.userRepository.deleteUser(id);
    if (deletedResult.value) {
      return EXCEPTION_MESSAGE.ENTITY_DELETED(ENTITY_NAME.USER, id);
    }
    return EXCEPTION_MESSAGE.DELETION_FAILED(this.entityName, id);
  }
  private async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
