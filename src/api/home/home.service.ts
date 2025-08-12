import { Inject, Injectable } from '@nestjs/common';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';

@Injectable()
export class HomeService {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryBase,
  ) {}

  async getSidemenuData() {
    return {};
  }

  async getTrendingPosts() {
    return await this.postRepository.getTrendingPosts();
  }

  async getFeed(session: ISession): Promise<IPostOutput[]> {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    return await this.userRepository.getUserFeed(user.userId as UserID);
  }
}
