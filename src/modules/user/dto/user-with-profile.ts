import { IsNotEmpty } from 'class-validator';
import CreateUserDTO from './create-user.dto';
import { CreateProfileDTO } from 'src/modules/user-profile/dto/create-profile.dto';

export default class CreateUserWithProfile {
  @IsNotEmpty()
  user: CreateUserDTO;

  @IsNotEmpty()
  profile: CreateProfileDTO;
}
