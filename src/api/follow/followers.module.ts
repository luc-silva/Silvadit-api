import { Module } from '@nestjs/common';
import { FollowerController } from './followers.controller';
import { FollowerService } from './followers.service';
import { UserRepository } from '../user/repository/user.repository';
import { FollowerRepository } from './repository/followers.repository';
import { FOLLOWERS_REPOSITORY_TOKEN } from './repository/followers.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';

@Module({
  imports: [],
  controllers: [FollowerController],
  providers: [
    FollowerService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    { provide: FOLLOWERS_REPOSITORY_TOKEN, useClass: FollowerRepository },
  ],
  exports: [USER_REPOSITORY_TOKEN],
})
export class FollowerModule {}
