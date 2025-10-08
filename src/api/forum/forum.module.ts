import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumRepository } from './repository/forum.repository';
import { FORUM_REPOSITORY_TOKEN } from './repository/forum.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepository } from '../user/repository/user.repository';
import { POST_REPOSITORY_TOKEN } from '../post/repository/post.repository.base';
import { PostRepository } from '../post/repository/post.repository';

@Module({
  imports: [],
  controllers: [ForumController],
  providers: [
    ForumService,
    { provide: FORUM_REPOSITORY_TOKEN, useClass: ForumRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    { provide: POST_REPOSITORY_TOKEN, useClass: PostRepository },
  ],
})
export class ForumModule {}
