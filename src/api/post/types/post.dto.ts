import {
  IsBoolean,
  IsBooleanString,
  IsDate,
  IsEnum,
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

export class DeletePostDTO {
  @IsString()
  post_id: string;
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
  user_id?: string;
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
