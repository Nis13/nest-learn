import { DataSource, Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepository extends Repository<UserProfile> {
  constructor(private readonly dataSource: DataSource) {
    super(UserProfile, dataSource.createEntityManager());
  }
  async saveProfile(
    userId: string,
    profileToCreate: CreateProfileDTO,
  ): Promise<UserProfile> {
    return this.save({ userId, ...profileToCreate });
  }
}
