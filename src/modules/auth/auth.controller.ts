import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO.name, signInDTO.password);
  }
}
