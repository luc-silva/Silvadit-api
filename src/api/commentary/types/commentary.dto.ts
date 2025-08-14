import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePostCommentaryDTO {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  replyId?: string;

  @IsString()
  postId: string;

}

export class DeleteCommentaryDataDTO {
  @IsString()
  commentary_id: string;
}

export class UpdateCommentaryDataDTO {
  @IsString()
  content: string;
}

export class ReactCommentaryDataDTO {
  @IsString()
  target_id: string;

  @IsEnum({ enum: ['post', 'commentary'] })
  target_type: 'post' | 'commentary';

  @IsEnum({ enum: [] })
  reaction: string;

  @IsDate()
  date_created: Date;
}
