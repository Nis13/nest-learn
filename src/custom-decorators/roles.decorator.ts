import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from 'src/constants/metadata-key.constants';

export const Roles = (roles: string[]) => SetMetadata(ROLE_KEY, roles);
