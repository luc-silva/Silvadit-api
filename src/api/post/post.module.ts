import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repository/post.repository';
import { CommentaryRepository } from '../commentary/repository/commentary.repository';
import { COMMENTARY_REPOSITORY_TOKEN } from '../commentary/repository/commentary.repository.base';
import { POST_REPOSITORY_TOKEN } from './repository/post.repository.base';
import { UserRepository } from '../user/repository/user.repository';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { FORUM_REPOSITORY_TOKEN } from '../forum/repository/forum.repository.base';
import { ForumRepository } from '../forum/repository/forum.repository';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from '../forum_members/repository/forum_members.repository.base';
import { ForumMembersRepository } from '../forum_members/repository/forum_members.repository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    { provide: POST_REPOSITORY_TOKEN, useClass: PostRepository },
    { provide: COMMENTARY_REPOSITORY_TOKEN, useClass: CommentaryRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    { provide: FORUM_REPOSITORY_TOKEN, useClass: ForumRepository },
    {
      provide: FORUM_MEMBERS_REPOSITORY_TOKEN,
      useClass: ForumMembersRepository,
    },
  ],
  exports: [POST_REPOSITORY_TOKEN],
})
export class PostModule {}
