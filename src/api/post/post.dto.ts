import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDTO {
  @IsString()
  user_id: string;

  @IsString()
  post_id: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  forum_id?: string;

  @IsBoolean()
  @IsOptional()
  is_nsfw: 'S' | 'N';
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
  is_nsfw: boolean;

  @IsString()
  post_id: string;
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
