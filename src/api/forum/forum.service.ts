import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BanUserDTO,
  CreateForumDataDTO,
  GetForumMemberFilterDTO,
} from './types/forum.dto';
import {
  FORUM_REPOSITORY_TOKEN,
  ForumRepositoryBase,
} from './repository/forum.repository.base';
import { ForumMapper } from './utils/forum.mapper';
import { ForumValidator } from './utils/forum.validator';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import {
  FORUM_MEMBERS_REPOSITORY_TOKEN,
  ForumMembersRepositoryBase,
} from '../forum_members/repository/forum_members.repository.base';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from '../post/repository/post.repository.base';
import { PostMapper } from '../post/utils/post.mapper';
import { ForumMembersMapper } from '../forum_members/utils/forum_members.mapper';
import { ForumAssembler } from './utils/forum.assembler';
import { ForumMembersOrder } from '../forum_members/utils/forum_members.order';
import { GetPostsDTO } from '../post/types/post.dto';

@Injectable()
export class ForumService {
  constructor(
    @Inject(FORUM_REPOSITORY_TOKEN)
    private forumRepository: ForumRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN)
    private userRepository: UserRepositoryBase,
    @Inject(FORUM_MEMBERS_REPOSITORY_TOKEN)
    private forumMembersRepository: ForumMembersRepositoryBase,
    @Inject(POST_REPOSITORY_TOKEN)
    private postRepository: PostRepositoryBase,
  ) {}

  async createForum(body: CreateForumDataDTO, session: ISession) {
    ForumValidator.createForum(body);

    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const forum = ForumMapper.createForum(body);

    const { id } = await this.forumRepository.createForum(forum);

    const data = ForumMembersMapper.toSubscribeParams(
      user.userId,
      id,
      true,
      true,
    );
    return await this.forumMembersRepository.subscribeUser(data);
  }

  async getTrendingForums() {
    return await this.forumRepository.getTrendingForums();
  }

  async getForumDetails(id: string, session: ISession | null) {
    let user: ICompleteUser | null = null;

    if (session) {
      user = await this.userRepository.getUserByIdOrUsername(session.id);
    }

    const data: IForumDetailsParams = ForumMapper.toForumDetailsParams(
      user,
      id,
    );

    const forum = await this.forumRepository.getForumDetails(data);
    if (!forum) {
      throw new Error('Forum not found.');
    }

    const forumStaff = await this.forumMembersRepository.getForumStaff({
      forum_id: forum.forum_id,
    });

    return ForumAssembler.toForum(forum, forumStaff);
  }

  async subscribeForum(id: string, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    const forum = await this.forumRepository.getForumById(id as ForumID);
    if (!forum) {
      throw new Error('Forum not found.');
    }

    const isSubscribed =
      await this.forumMembersRepository.checkIfUserSubscribed(
        user.userId as UserID,
        id as ForumID,
      );
    if (!isSubscribed) {
      const data: ISubscribeUserParams = ForumMembersMapper.toSubscribeParams(
        user.userId,
        id,
        false,
        false,
      );

      return await this.forumMembersRepository.subscribeUser(data);
    }

    if (isSubscribed) {
      const data: IUnsubscribeUserParams =
        ForumMembersMapper.toUnsubscribeParams(user.userId, id);

      return await this.forumMembersRepository.unsubscribeUser(data);
    }

    return 'Ok';
  }

  async banUserFromForum(body: BanUserDTO) {
    const data: IBanUserParams = {
      forum_id: body.forum_id as ForumID,
      user_id: body.user_id as UserID,
    };
    return await this.forumRepository.banUserFromForum(data);
  }

  async getPostsFromForum(dto: GetPostsDTO, session: ISession | null) {
    const forum = await this.forumRepository.getForumById(
      dto.forumId as ForumID,
    );
    if (!forum) {
      throw new Error('Forum not found.');
    }

    const { user } = await this.validatePrivacy(forum, session);

    const mappedFilter = PostMapper.toGetPosts(dto);

    const posts = await this.postRepository.getPosts(mappedFilter);

    return posts.map(PostMapper.mapPostDetails);
  }

  async getForumMembers(
    body: GetForumMemberFilterDTO,
    session: ISession | null,
  ) {
    const forum = await this.forumRepository.getForumById(
      body.forumId as ForumID,
    );
    if (!forum) {
      throw new Error('Forum not found.');
    }

    await this.validatePrivacy(forum, session);

    const params = ForumMembersMapper.toGetForumMembersParams(body);
    const order = ForumMembersOrder.toMembersFiltersOrder(body);

    const members = await this.forumMembersRepository.getForumMembers(
      params,
      order,
    );

    return members.map(ForumMembersMapper.toForumMembersOutput);
  }

  private async validatePrivacy(forum: IForumRaw, session: ISession | null) {
    let user: ICompleteUser | null = null;
    if (forum.is_private === 'S') {
      if (!session) {
        throw new Error('User not allowed without following the forum.');
      }

      user = await this.userRepository.getUserByIdOrUsername(session.id);
      if (!user) {
        throw new Error('User not found.');
      }

      const userFollowing =
        await this.forumMembersRepository.checkIfUserSubscribed(
          user.userId as UserID,
          forum.forum_id as ForumID,
        );
      if (!userFollowing) {
        throw new Error('User not allowed.');
      }
    }

    return { user };
  }
}
