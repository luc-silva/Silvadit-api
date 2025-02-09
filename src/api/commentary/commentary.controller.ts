import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommentaryService } from './commentary.service';

@Controller("commentary")
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Delete(":id")
  async deleteCommentary() {}

  @Post()
  async createCommentary() {}

  @Put(":id")
  async updateCommentary() {}

  @Post(":id/react")
  async reactCommentary() {}
}
