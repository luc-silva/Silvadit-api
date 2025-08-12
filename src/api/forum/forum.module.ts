import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumRepository } from './repository/forum.repository';
import { FORUM_REPOSITORY_TOKEN } from './repository/forum.repository.base';

@Module({
  imports: [],
  controllers: [ForumController],
  providers: [
    ForumService,
    { provide: FORUM_REPOSITORY_TOKEN, useClass: ForumRepository },
  ],
})
export class ForumModule {}
