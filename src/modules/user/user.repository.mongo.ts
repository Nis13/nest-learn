import { DataSource, MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Document } from 'mongodb';
import { toObjectId } from 'src/utils/toObjectId';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  getAll(): Promise<User[]> {
    return this.find();
  }

  getById(id: string): Promise<User> {
    return this.findOneBy({ _id: toObjectId(id) });
  }

  getByName(name: string): Promise<User> {
    return this.findOneBy({ name: name });
  }
  createUser(userToCreate: CreateUserDTO): Promise<User> {
    return this.save(userToCreate);
  }

  async updateUser(id: string, update: UpdateUserDTO): Promise<Document> {
    return this.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: update },
      { returnDocument: 'after' },
    );
  }

  async deleteUser(id: string): Promise<Document> {
    const result = await this.findOneAndDelete({ _id: toObjectId(id) });
    console.log(result);
    return result;
  }
}
