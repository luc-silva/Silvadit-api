import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import {
  ReactCommentaryDataDTO,
  UpdateCommentaryDataDTO,
} from './types/commentary.dto';
import { Public } from '~/utils/decorators/protect-routes';

@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Put()
  async updateCommentary(@Body() body: UpdateCommentaryDataDTO) {
    return await this.commentaryService.updateCommentary(body);
  }

  @Delete()
  async deleteCommentary(@Param('id') id: string) {
    return await this.commentaryService.deleteCommentary(id);
  }

  //escopo proprio
  @Post('react')

  async reactCommentary(@Body() body: ReactCommentaryDataDTO) {
    return await this.commentaryService.reactCommentary(body);
  }

  @Get(':id/replies')
  @Public()
  async getReplies(@Param('id') commentaryId: string) {
    return await this.commentaryService.getReplies(commentaryId);
  }
}
