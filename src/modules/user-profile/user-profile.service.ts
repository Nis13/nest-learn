import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UserProfile } from './user-profile.entity';
import { ProfileRepository } from './user-profile.respository';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly logger: Logger,
    private readonly profileRepository: ProfileRepository,
  ) {}
  async saveProfile(
    userId: string,
    profileToCreate: CreateProfileDTO,
  ): Promise<UserProfile> {
    this.logger.log(`creating user with name: ${profileToCreate.age}`);
    return this.profileRepository.saveProfile(userId, profileToCreate);
  }
}
