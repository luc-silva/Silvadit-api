import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDate,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDTO {
  @IsString()
  content: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  forumId?: string;

  @IsBooleanString()
  @IsOptional()
  isNsfw: string;
}

export class ReactPostDTO {
  @IsString()
  post_id: string;

  @IsString()
  user_id: string;

  @IsString()
  is_upvote: boolean;
}

export class UpdatePostDTO {
  @IsString()
  content: string;

  @IsBoolean()
  isNsfw: boolean;

  @IsString()
  postId: string;

  @IsString()
  title: string;
}

export class GetPostsDTO {
  @IsString()
  userId?: string;

  @IsString()
  fromUser?: string;

  @IsString()
  forumId?: string;

  @IsString()
  postId?: string;

  @IsEnum(['N', 'S'])
  isNsfw?: IYesNo;

  @IsArray()
  tags?: string[]

  @IsOptional()
  orderField?: string;

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  orderDirection?: 'asc' | 'desc';

  @IsNumberString()
  page: string;

  @IsNumberString()
  itemsPerPage: string;

}

export class IBookmarkPostData {
  @IsString()
  post_id: string;

  @IsString()
  user_id: string;

  @IsString()
  date_created: string;
}

export class IUnbookmarkPostData {
  @IsString()
  post_id: string;

  @IsString()
  user_id: string;
}
