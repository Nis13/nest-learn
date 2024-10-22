import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('user_profile')
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  contactNo: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: string;
}
