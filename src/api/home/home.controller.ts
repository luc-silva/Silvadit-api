import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { ExtractUser } from '~/utils/decorators/extract-user';

@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

  @Get('side')
  async getSidemenuData() {
    return await this.homeService.getSidemenuData();
  }

  @Get()
  async getFeed(@ExtractUser() session: ISession) {
    return await this.homeService.getFeed(session);
  }
}
