import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UserProfile } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post('/:id')
  create(
    @Param('id') userid: string,
    @Body() userToCreate: CreateProfileDTO,
  ): Promise<UserProfile> {
    return this.userProfileService.saveProfile(userid, userToCreate);
  }
}
