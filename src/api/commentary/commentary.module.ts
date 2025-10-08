import { Module } from '@nestjs/common';
import { CommentaryController } from './commentary.controller';
import { CommentaryService } from './commentary.service';
import { CommentaryRepository } from './repository/commentary.repository';
import { COMMENTARY_REPOSITORY_TOKEN } from './repository/commentary.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [],
  controllers: [CommentaryController],
  providers: [
    CommentaryService,
    { provide: COMMENTARY_REPOSITORY_TOKEN, useClass: CommentaryRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
  ],
  exports: [COMMENTARY_REPOSITORY_TOKEN],
})
export class CommentaryModule {}
