import { Inject, Injectable } from '@nestjs/common';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { GetFeedDTO } from './types/feed.dto';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';

@Injectable()
export class FeedService {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryBase,
  ) {}

  async getFeed(data: GetFeedDTO, session: ISession | null) {
    if (session) {
      const user = await this.userRepository.getUserByIdOrUsername(session.id);
      if (!user) {
        throw new Error('User not found');
      }
    }
  }
}
