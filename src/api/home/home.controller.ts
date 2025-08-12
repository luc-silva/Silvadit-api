import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreatePostDTO } from '../post/types/post.dto';
import { PostService } from '../post/post.service';
import { ExtractUser } from '~/utils/decorators/extract-user';

@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly postService: PostService,
  ) {}

  @Get('side')
  async getSidemenuData() {
    return await this.homeService.getSidemenuData();
  }

  @Get()
  async getFeed(@ExtractUser() session: ISession) {
    return await this.homeService.getFeed(session);
  }

  @Post('post')
  async createPost(
    @Body() body: CreatePostDTO,
    @ExtractUser() session: ISession,
  ) {
    return await this.postService.createPost(body, session);
  }
}
