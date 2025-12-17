import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { PostRepository } from '../post/repository/post.repository';
import { USER_REPOSITORY_TOKEN } from './repository/user.repository.token';
import { POST_REPOSITORY_TOKEN } from '../post/repository/post.repository.base';
import { ForumMembersRepository } from '../forum_members/repository/forum_members.repository';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from '../forum_members/repository/forum_members.repository.base';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    { provide: POST_REPOSITORY_TOKEN, useClass: PostRepository },
    {
      provide: FORUM_MEMBERS_REPOSITORY_TOKEN,
      useClass: ForumMembersRepository,
    },
  ],
  exports: [USER_REPOSITORY_TOKEN],
})
export class UserModule {}
