import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryBase } from './repository/user.repository.base';
import { USER_REPOSITORY_TOKEN } from './repository/user.repository.token';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { PostMapper } from '../post/utils/post.mapper';
import {
  FORUM_MEMBERS_REPOSITORY_TOKEN,
  ForumMembersRepositoryBase,
} from '../forum_members/repository/forum_members.repository.base';
import { ForumMembersMapper } from '../forum_members/utils/forum_members.mapper';
import { UpdateUserDetailsDTO, UpdateUserLocationDTO } from './types/user.dto';
import { UserMapper } from './utils/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryBase,
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: PostRepositoryBase,
    @Inject(FORUM_MEMBERS_REPOSITORY_TOKEN)
    private readonly forumMembersRepository: ForumMembersRepositoryBase,
  ) {}

  async getUserFollowers(id: string) {
    return await this.userRepository.getUserFollowers(id as UserID);
  }

  async getUserFollowing(id: string) {
    return await this.userRepository.getUserFollowingAccounts(id as UserID);
  }

  async getUserDetails(login: string): Promise<IUserOutput> {
    const data = await this.userRepository.getUserDetails(login);
    if (!data) {
      throw new Error('User not found.');
    }
    return data;
  }

  async updateUserDetails(body: UpdateUserDetailsDTO, session: ISession) {
    const foundUser = await this.userRepository.getUserByIdOrUsername(
      session.id,
    );
    if (!foundUser) {
      throw new Error('User not found.');
    }

    const params = UserMapper.toUpdateDetailsParams(body, foundUser);

    return await this.userRepository.updateUserDetails(params);
  }

  async updateUserLocation(body: UpdateUserLocationDTO, session: ISession) {
    const foundUser = await this.userRepository.getUserByIdOrUsername(
      session.id,
    );
    if (!foundUser) {
      throw new Error('User not found.');
    }

    const params = UserMapper.toUpdateLocationParams(body, foundUser);

    return await this.userRepository.updateUserLocation(params);
  }

  async inactivateUser() {}

  async banUser() {}

  async getUserPosts(id: string): Promise<IPostOutput[]> {
    const user = await this.userRepository.getUserByIdOrUsername(id);
    if (!user) {
      throw new Error('User not found.');
    }

    const filter: IGetPostsFilter = { user_id: user.userId };

    const posts = await this.postRepository.getPosts(filter);

    return posts.map<IPostOutput>(PostMapper.mapPostDetails);
  }

  async getUserLoginData() {}

  async getUserSubscribedForums(id: string): Promise<ISubscribedForumOutput[]> {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }

    const forums = await this.forumMembersRepository.getForumsFromUser(
      id as UserID,
    );

    return forums.map(ForumMembersMapper.subscribedForum);
  }

  async getUserFollowedUsers(id: string): Promise<ISubscribedUser[]> {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }

    return this.userRepository.getUserFollowingAccounts(data.userId as UserID);
  }

  async getUserSavedPosts(id: string) {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }
  }

  async getUserActivity(id: string): Promise<IActivity[]> {
    return [];
  }
}
