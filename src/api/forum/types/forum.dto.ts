import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

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

export class GetForumMemberFilterDTO {
  @IsString()
  @IsOptional()
  forumId: string;

  @IsOptional()
  @IsEnum(['Y', 'N'])
  isAdmin?: IYesNo;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumberString()
  page: string;

  @IsNumberString()
  itemsPerPage: string;

  @IsOptional()
  orderField?: string;

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  orderDirection?: 'asc' | 'desc';
}
