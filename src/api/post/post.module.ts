import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { CommentaryRepository } from '../commentary/commentary.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentaryRepository],
})
export class PostModule {}
