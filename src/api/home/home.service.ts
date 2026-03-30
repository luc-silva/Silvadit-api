import { Inject, Injectable } from '@nestjs/common';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import { PostMapper } from '../post/utils/post.mapper';
import { GetFeedDTO } from './types/home.dto';
import { HomeFilter } from './utils/home.filter';

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

  //TODO: adapt feed to no session
  async getFeed(session: ISession, dto: GetFeedDTO): Promise<IPostOutput[]> {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const filter = HomeFilter.createFeedFilters(dto);

    const data = await this.postRepository.getPosts(filter);
    return data.map(PostMapper.mapPostDetails);
  }
}
