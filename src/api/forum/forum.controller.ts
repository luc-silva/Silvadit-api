import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  BanUserDTO,
  CreateForumDataDTO,
  FollowForumDataDTO,
} from './types/forum.dto';
import { ExtractUser } from '~/utils/decorators/extract-user';
import { Public } from '~/utils/decorators/protect-routes';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  async getTrandingForums() {
    return await this.forumService.getTrendingForums();
  }

  @Get(':id')
  @Public()
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
  async createForum(
    @Body() body: CreateForumDataDTO,
    @ExtractUser() user: ISession,
  ) {
    return await this.forumService.createForum(body, user);
  }
}
