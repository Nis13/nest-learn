import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeorm.config';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(TypeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
