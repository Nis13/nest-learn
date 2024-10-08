import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export default class CreateUserDTO {
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  @Length(5, 50)
  name: string;

  @IsNotEmpty({ message: "Email shouldn't be empty" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Password shouldn't be empty" })
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
