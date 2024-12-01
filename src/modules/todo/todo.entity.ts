import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
} from 'typeorm';
import { TO_DO_STATUS } from './todo-status.enum';
import { User } from '../user/user.entity';
import { ObjectId } from 'mongodb';

@Entity('todo')
export class ToDo extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  status: TO_DO_STATUS;

  @Column({ name: 'user_id' })
  userId: ObjectId;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
