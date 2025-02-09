import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumRepository } from './forum.repository';

@Module({
  imports: [],
  controllers: [ForumController],
  providers: [ForumService, ForumRepository],
})
export class ForumModule {}
