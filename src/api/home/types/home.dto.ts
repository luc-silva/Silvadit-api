import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetFeedDTO {
  @IsString()
  orderField?: string;

  @IsEnum(['post', 'user', 'forum'])
  type?: 'post' | 'user' | 'forum' | 'all';

  @IsEnum(['S', 'N'])
  isNsfw?: IYesNo;

  @IsString()
  orderDirection?: string;

  @IsNumberString()
  page: number;

  @IsNumberString()
  itemsPerPage: number;

  @IsString()
  @IsOptional()
  fromUserId?: string;

  @IsString()
  @IsOptional()
  forumId?: string;
}
