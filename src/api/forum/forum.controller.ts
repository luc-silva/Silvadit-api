import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import {
  BanUserDTO,
  CreateForumDataDTO,
  GetForumMemberFilterDTO,
} from './types/forum.dto';
import { ExtractSession } from '~/utils/decorators/extract-user';
import {
  OptionalAuth,
  Public,
} from '~/utils/decorators/protect-routes/PublicDecorator';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  async getTrandingForums() {
    return await this.forumService.getTrendingForums();
  }

  @Get(':id')
  @OptionalAuth()
  async getForumDetails(
    @Param('id') id: string,
    @ExtractSession() session: ISession | null,
  ) {
    return await this.forumService.getForumDetails(id, session);
  }

  @Get(':id/posts')
  @OptionalAuth()
  async getForumPosts(
    @Param('id') id: string,
    @ExtractSession() session: ISession | null,
  ) {
    return await this.forumService.getPostsFromForum(id, session);
  }

  @Post('ban-user')
  async banUserFromForum(@Body() body: BanUserDTO) {
    return await this.forumService.banUserFromForum(body);
  }

  @Post()
  async createForum(
    @Body() body: CreateForumDataDTO,
    @ExtractSession() session: ISession,
  ) {
    return await this.forumService.createForum(body, session);
  }

  @Post()
  async createPost(
    @Body() body: CreateForumDataDTO,
    @ExtractSession() session: ISession,
  ) {
    return await this.forumService.createForum(body, session);
  }

  @Post(':id/subscribe')
  async subscribeForum(
    @Param('id') id: string,
    @ExtractSession() session: ISession,
  ) {
    return await this.forumService.subscribeForum(id, session);
  }

  @Get(':id/members')
  @OptionalAuth()
  async getForumMembers(
    @Query() params: GetForumMemberFilterDTO,
    @Param('id') forumId: string,
    @ExtractSession() session: ISession,
  ) {
    return await this.forumService.getForumMembers(
      { ...params, forumId },
      session,
    );
  }
}
