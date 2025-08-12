import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  BanUserDTO,
  CreateForumDataDTO,
  FollowForumDataDTO,
  UnfollowForumDataDTO,
} from './types/forum.dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  async getTrandingForums() {
    return await this.forumService.getTrendingForums();
  }

  @Get(':id')
  async getForumDetails(@Param('id') id: string) {
    return await this.forumService.getForumDetails(id);
  }

  @Post('follow')
  async followForum(@Body() body: FollowForumDataDTO) {
    return await this.forumService.subscribeForum();
  }

  @Post('ban-user')
  async banUserFromForum(@Body() body: BanUserDTO) {
    return await this.forumService.banUserFromForum(body);
  }

  @Post()
  async createForum(@Body() body: CreateForumDataDTO) {
    return await this.forumService.createForum(body);
  }
}
