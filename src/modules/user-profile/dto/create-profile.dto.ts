import { IsNotEmpty } from 'class-validator';

export class CreateProfileDTO {
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  contactNo: number;
}
