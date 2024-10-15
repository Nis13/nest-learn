import {
  DataSource,
  DeleteResult,
  Equal,
  MongoRepository,
  Repository,
} from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  getAll(): Promise<User[]> {
    return this.find();
  }

  getById(id: string): Promise<User> {
    return this.findOneBy({ id: Equal(id) });
  }

  getByName(name: string): Promise<User> {
    return this.findOneBy({ name: Equal(name) });
  }
  async saveUser(userToCreate: CreateUserDTO) {
    const user = await this.insert(userToCreate);
    console.log(user);
    return user;
  }

  async updateUser(id: string, update: UpdateUserDTO): Promise<User> {
    await this.update(id, update);
    return this.findOneBy({ id: Equal(id) });
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
