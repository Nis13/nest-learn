import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToDo } from '../todo/todo.entity';
import { UserRole } from './user-role.enum';

@Entity('user')
export class User extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @ObjectIdColumn()
  id: string;

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
