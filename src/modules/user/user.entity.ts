import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';
import { ToDo } from '../todo/todo.entity';
import { UserRole } from './user-role.enum';
import { ObjectId } from 'mongodb';

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => ToDo, (todo) => todo.user)
  todos: ToDo[];
}
