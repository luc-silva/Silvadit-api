import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryBase } from './repository/user.repository.base';
import { IUpdateUserParams } from './repository/user.interface';
import { UpdateUserDTO } from '../auth/types/auth.dto';
import { USER_REPOSITORY_TOKEN } from './repository/user.repository.token';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import {
  FORUM_REPOSITORY_TOKEN,
  ForumRepositoryBase,
} from '../forum/repository/forum.repository.base';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryBase,
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: PostRepositoryBase,
    @Inject(FORUM_REPOSITORY_TOKEN)
    private readonly forumRepository: ForumRepositoryBase,
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

    return posts.map<IPostOutput>((data) => ({
      postId: data.postId,
      owner: {
        userId: 'Teste',
        username: 'Teste',
      },
      forum: {
        title: 'Teste',
      },
      content: data.content,
      title: data.title,
      isNsfw: data.isNsfw,
      dateCreated: data.dateCreated,
      dateEdited: data.dateEdited,
    }));
  }

  async getUserLoginData() {}

  async getUserSubscribedForums(id: string): Promise<ISubscribedForum[]> {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }

    const forums = await this.forumRepository.getForumsFromUser(id as UserID);

    return forums.map((forum) => ({
      banned: forum.banned,
      dateCreated: forum.dateCreated,
      description: forum.description,
      forumId: forum.forumId,
      name: forum.name,
      dateSubscribed: forum.dateSubscribed,
      isAdmin: forum.isAdmin,
      isFounder: forum.isFounder,
    }));
  }

  async getUserFollowedUsers(id: string): Promise<ISubscribedUser[]> {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }

    return this.userRepository.getUserFollowingAccounts(data.userId as UserID);
  }

  //n lembro o propsito desse. saved post?
  async getUserSavedForums(id: string) {
    const data = await this.userRepository.getUserDetails(id);
    if (!data) {
      throw new Error('User not found.');
    }

    return await this.forumRepository.getForumsFromUser(id as UserID);
  }

  async getUserActivity(id: string): Promise<IActivity[]> {
    return [];
  }
}
