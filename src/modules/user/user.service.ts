import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { EXCEPTION_MESSAGE } from 'src/constants/exception-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  getall(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  async saveUser(userToCreate: CreateUserDTO): Promise<User> {
    console.log(userToCreate.password);
    const password = await bcrypt.hash(userToCreate.password, 10);
    return this.userRepository.saveUser({
      ...userToCreate,
      password: password,
    });
  }

  update(id: string, userToUpdate: UpdateUserDTO): Promise<User> {
    return this.userRepository.updateUser(id, userToUpdate);
  }

  async delete(id: string): Promise<string> {
    if ((await this.userRepository.deleteUser(id)).affected == 1) {
      return EXCEPTION_MESSAGE.DELETION_SUCCESSFULL;
    }
    return EXCEPTION_MESSAGE.NOT_DELETED;
  }
}
