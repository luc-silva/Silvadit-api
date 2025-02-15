import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentaryService } from './commentary.service';

@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Put(':id')
  async updateCommentary(@Param('id') id: string) {
    return await this.commentaryService.updateCommentary();
  }

  @Delete(':id')
  async deleteCommentary(@Param('id') id: string) {
    return await this.commentaryService.deleteCommentary();
  }

  @Post(':id/react')
  async reactCommentary(@Param('id') id: string) {
    return await this.commentaryService.addCommentaryReaction();
  }
}
