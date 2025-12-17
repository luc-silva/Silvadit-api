import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryBase } from './repository/user.repository.base';
import { IUpdateUserParams } from './repository/user.interface';
import { UpdateUserDTO } from '../auth/types/auth.dto';
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

  async updateUserDetails(body: UpdateUserDTO) {
    const params: IUpdateUserParams = {
      country: body.country,
      description: body.description,
      first_name: body.firstName,
      last_name: body.lastName,
      state: body.state,
    };

    return await this.userRepository.updateUser(params);
  }

  async inactivateUser() {}

  async banUser() {}

  async getUserComentaries() {}

  async getUserPosts(id: string): Promise<IPostOutput[]> {
    const user = await this.userRepository.getUserByIdOrUsername(id);
    if (!user) {
      throw new Error('User not found.');
    }

    const posts = await this.postRepository.getPosts(user.userId as UserID);

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
