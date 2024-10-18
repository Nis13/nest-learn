import { Expose } from 'class-transformer';
import { Entity } from 'typeorm';

@Entity('user')
export class GeneralUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
