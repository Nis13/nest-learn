import { DataSource, DeleteResult, Equal, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
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
  saveUser(userToCreate: CreateUserDTO): Promise<User> {
    const user = this.create(userToCreate);
    return this.save(user);
  }

  async updateUser(id: string, update: UpdateUserDTO): Promise<User> {
    await this.update(id, update);
    return this.findOneBy({ id: Equal(id) });
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
