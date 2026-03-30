import { Module } from '@nestjs/common';
import { PostRepository } from '../post/repository/post.repository';
import { POST_REPOSITORY_TOKEN } from '../post/repository/post.repository.base';
import { FeedService } from './feed.service';

@Module({
  providers: [
    FeedService,
    { useClass: PostRepository, provide: POST_REPOSITORY_TOKEN },
  ],
})
export class FeedModule {}
