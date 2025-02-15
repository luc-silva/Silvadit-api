import { IsOptional, IsString } from 'class-validator';

export class CreatePostCommentaryDTO {
  @IsString()
  user_id: string;

  @IsString()
  post_id: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  reply_id?: string;
}
