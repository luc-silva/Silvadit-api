import { Module } from '@nestjs/common';
import { ForumMembersRepository } from './repository/forum_members.repository';
import { FORUM_MEMBERS_REPOSITORY_TOKEN } from './repository/forum_members.repository.base';

@Module({
  providers: [
    {
      provide: FORUM_MEMBERS_REPOSITORY_TOKEN,
      useClass: ForumMembersRepository,
    },
  ],
})
export class ForumMembersModule {}
