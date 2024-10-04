import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

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
}
