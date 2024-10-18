import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import CreateUserDTO from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private logger: Logger,
  ) {}
  SERVICE = AuthService.name;

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByName(username);
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUpUser(userToCreate: CreateUserDTO): Promise<User> {
    this.logger.log(
      `creating user with name: ${userToCreate.name}`,
      this.SERVICE,
    );
    return this.userService.saveUser(userToCreate);
  }
}
