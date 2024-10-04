import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config/typeorm.config';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(TypeORMConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
