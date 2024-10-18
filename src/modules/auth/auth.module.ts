import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {}
