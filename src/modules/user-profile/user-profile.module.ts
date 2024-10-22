import { Logger, Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { ProfileRepository } from './user-profile.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, Logger, ProfileRepository],
  imports: [TypeOrmModule.forFeature([UserProfile])],
  exports: [UserProfileService],
})
export class UserProfileModule {}
