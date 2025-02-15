import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { CommentaryRepository } from '../commentary/commentary.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentaryRepository],
  exports: [PostRepository],
})
export class PostModule {}
