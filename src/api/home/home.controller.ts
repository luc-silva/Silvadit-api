import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { ExtractUser } from '~/utils/decorators/extract-user';
import { OptionalAuth } from '~/utils/decorators/protect-routes/PublicDecorator';
import { GetFeedDTO } from './types/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('side')
  async getSidemenuData() {
    return await this.homeService.getSidemenuData();
  }

  @Get()
  @OptionalAuth()
  async getFeed(@ExtractUser() session: ISession, @Query() params: GetFeedDTO) {
    return await this.homeService.getFeed(session, params);
  }
}
// continuar filtragem no feed
//ir pensando como mesclar diferentes tipos de feed
/*
  type: reshare, like/react, post
  post: post
*/
