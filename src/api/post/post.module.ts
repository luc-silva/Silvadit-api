import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repository/post.repository';
import { CommentaryRepository } from '../commentary/repository/commentary.repository';
import { COMMENTARY_REPOSITORY_TOKEN } from '../commentary/repository/commentary.repository.base';
import { POST_REPOSITORY_TOKEN } from './repository/post.repository.base';
import { UserRepository } from '../user/repository/user.repository';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    { provide: POST_REPOSITORY_TOKEN, useClass: PostRepository },
    { provide: COMMENTARY_REPOSITORY_TOKEN, useClass: CommentaryRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository }
  ],
  exports: [POST_REPOSITORY_TOKEN],
})
export class PostModule {}
