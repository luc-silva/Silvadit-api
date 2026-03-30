import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator';

export class GetFeedDTO {
  @IsString()
  orderField?: string;

  @IsEnum(['post', 'user', 'forum'])
  type?: 'post' | 'user' | 'forum' | 'all';

  @IsString()
  orderDirection?: string;

  @IsNumberString()
  page: number;

  @IsNumberString()
  itemsPerPage: number;
}
