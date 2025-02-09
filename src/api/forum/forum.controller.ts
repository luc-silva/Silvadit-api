import { Controller, Get } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller("forum")
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get(":id")
  async getHello() {}
}
