import { Module } from '@nestjs/common';
import { CommentaryController } from './commentary.controller';
import { CommentaryService } from './commentary.service';
import { CommentaryRepository } from './repository/commentary.repository';
import { COMMENTARY_REPOSITORY_TOKEN } from './repository/commentary.repository.base';

@Module({
  imports: [],
  controllers: [CommentaryController],
  providers: [
    CommentaryService,
    { provide: COMMENTARY_REPOSITORY_TOKEN, useClass: CommentaryRepository },
  ],
  exports: [COMMENTARY_REPOSITORY_TOKEN],
})
export class CommentaryModule {}
