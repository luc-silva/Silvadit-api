import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { CommentaryRepository } from '../commentary/repository/commentary.repository';
import { PostRepository } from '../post/repository/post.repository';
import { COMMENTARY_REPOSITORY_TOKEN } from '../commentary/repository/commentary.repository.base';
import { POST_REPOSITORY_TOKEN } from '../post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepository } from '../user/repository/user.repository';
import { PostService } from '../post/post.service';

@Module({
  controllers: [HomeController],
  providers: [
    HomeService,
    PostService,
    { useClass: CommentaryRepository, provide: COMMENTARY_REPOSITORY_TOKEN },
    { useClass: UserRepository, provide: USER_REPOSITORY_TOKEN },
    { useClass: PostRepository, provide: POST_REPOSITORY_TOKEN },
  ],
  exports: [],
})
export class HomeModule {}
