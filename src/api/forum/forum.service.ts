import { Inject, Injectable } from '@nestjs/common';
import { BanUserDTO, CreateForumDataDTO } from './types/forum.dto';
import {
  FORUM_REPOSITORY_TOKEN,
  ForumRepositoryBase,
} from './repository/forum.repository.base';
import { ForumMapper } from './utils/forum.mapper';
import { ForumValidator } from './utils/forum.validator';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import { CreatePostDTO } from '../post/types/post.dto';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { PostValidator } from '../post/utils/post.validator';
import { HomepageMapper } from '../home/utils/home.mapper';

@Injectable()
export class ForumService {
  constructor(
    @Inject(FORUM_REPOSITORY_TOKEN)
    private forumRepository: ForumRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN)
    private userRepository: UserRepositoryBase,
    @Inject(POST_REPOSITORY_TOKEN)
    private postRepository: PostRepositoryBase,
  ) {}

  async createForum(body: CreateForumDataDTO, session: ISession) {
    ForumValidator.createForum(body);

    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const data = ForumMapper.createForum(body);

    return await this.forumRepository.createForum(data);
  }

  async getTrendingForums() {
    return await this.forumRepository.getTrendingForums();
  }

  async getForumDetails(id: string) {
    return await this.forumRepository.getForumDetails(id as ForumID);
  }

  async subscribeForum() {
    // check if user already subscribed
    // if not
    //return await this.forumRepository.followForum(body);
    // else
    //return await this.forumRepository.unfollowForum(body);
  }

  async banUserFromForum(body: BanUserDTO) {
    const data: IBanUserParams = {
      forum_id: body.forum_id as ForumID,
      user_id: body.user_id as UserID,
    };
    return await this.forumRepository.banUserFromForum(data);
  }

  async createPost(post: CreatePostDTO, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    PostValidator.createPost(post);
    const mappedPost = HomepageMapper.createPost(post, user);
    return await this.postRepository.createPost(mappedPost);
  }
}
