import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import CreateUserDTO from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO.name, signInDTO.password);
  }

  @Post('/signup')
  signUp(@Body() userToCreate: CreateUserDTO): Promise<User> {
    return this.authService.signUpUser(userToCreate);
  }
}
