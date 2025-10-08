import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateForumDataDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isNsfw: boolean;

  @IsBoolean()
  isPrivate: boolean;

  @IsArray()
  tags: string[];
}

export class UpdateForumDataDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class FollowForumDataDTO {
  @IsString()
  forum_id: string;

  @IsString()
  user_id: string;

  @IsEnum({ enum: ['S', 'N'] })
  is_admin: 'S' | 'N';

  @IsEnum({ enum: ['S', 'N'] })
  is_founder: 'S' | 'N';

  @IsString()
  date_created: Date;
}

export class UnfollowForumDataDTO {
  @IsString()
  forum_id: string;

  @IsString()
  user_id: string;
}

export class BanUserDTO {
  @IsString()
  user_id: string;

  @IsString()
  forum_id: string;
}
