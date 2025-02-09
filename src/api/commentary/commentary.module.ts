import { Module } from '@nestjs/common';
import { CommentaryController } from './commentary.controller';
import { CommentaryService } from './commentary.service';
import { CommentaryRepository } from './commentary.repository';

@Module({
  imports: [],
  controllers: [CommentaryController],
  providers: [CommentaryService, CommentaryRepository],
  exports: [CommentaryRepository],
})
export class CommentaryModule {}
