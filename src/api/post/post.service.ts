import { Inject, Injectable } from '@nestjs/common';
import { CreatePostCommentaryDTO } from '../commentary/types/commentary.dto';
import { CreatePostDTO, ReactPostDTO, UpdatePostDTO } from './types/post.dto';
import {
  COMMENTARY_REPOSITORY_TOKEN,
  CommentaryRepositoryBase,
} from '../commentary/repository/commentary.repository.base';
import {
  POST_REPOSITORY_TOKEN,
  PostRepositoryBase,
} from './repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import { PostValidator } from './utils/post.validator';
import { HomepageMapper } from '../home/utils/home.mapper';
import { CommentaryMapper } from '../commentary/utils/commentary.mapper';
import { PostMapper } from './utils/post.mapper';
import { NotFoundError } from 'rxjs';
import {
  FORUM_REPOSITORY_TOKEN,
  ForumRepositoryBase,
} from '../forum/repository/forum.repository.base';
import {
  FORUM_MEMBERS_REPOSITORY_TOKEN,
  ForumMembersRepositoryBase,
} from '../forum_members/repository/forum_members.repository.base';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepositoryBase,
    @Inject(COMMENTARY_REPOSITORY_TOKEN)
    private commentaryRepository: CommentaryRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryBase,
    @Inject(FORUM_REPOSITORY_TOKEN)
    private forumRepository: ForumRepositoryBase,
    @Inject(FORUM_MEMBERS_REPOSITORY_TOKEN)
    private forumMembersRepository: ForumMembersRepositoryBase,
  ) {}

  async createPost(body: CreatePostDTO, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    PostValidator.createPost(body);

    if (body.forumId) {
      const forum = await this.forumRepository.getForumById(
        body.forumId as ForumID,
      );
      if (!forum) {
        throw new Error('Forum not found.');
      }

      const subscribed =
        await this.forumMembersRepository.checkIfUserSubscribed(
          user.userId as UserID,
          forum.forum_id as ForumID,
        );
      if (!subscribed) {
        throw new Error('User not allowed.');
      }
    }

    const parsedData: ICreatePostParams = HomepageMapper.createPost(body, user);
    return await this.postRepository.createPost(parsedData);
  }

  async updatePost(body: UpdatePostDTO, session: ISession) {
    const found = await this.postRepository.getPostDetails(
      body.postId as PostID,
    );
    if (!found) throw new Error('Post not found.');

    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) throw new Error('User not found.');

    if (user.userId !== found.owner_id)
      throw new Error('User is not owner of the post.');

    const parsedData = PostMapper.updatePost(body);

    return await this.postRepository.updatePost(parsedData);
  }

  async deletePost(id: string, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) throw new Error('User not found.');

    const post = await this.postRepository.getPostDetails(id as PostID);
    if (!post) throw new Error('Post not found.');

    if (user.userId !== post.owner_id)
      throw new Error('User is not owner of the post.');

    return await this.postRepository.deletePost(id as PostID);
  }

  async reactPost(body: ReactPostDTO) {
    const parsedData: IReactPostParams = {
      ...body,
      date_created: new Date(),
      is_upvote: body.is_upvote ? 'S' : 'N',
    };
    return await this.postRepository.reactPost(parsedData);
  }

  async getPostComentaries(post_id: string) {
    const rawCommentaries =
      await this.commentaryRepository.getCommentariesFromPost(
        post_id as PostID,
      );

    return CommentaryMapper.fromRaw(rawCommentaries);
  }

  async createPostCommentary(body: CreatePostCommentaryDTO, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    PostValidator.createPostCommentary(body);

    const parsed = CommentaryMapper.createCommentary(body, user);
    return await this.commentaryRepository.createCommentary(parsed);
  }

  async getPostDetails(id: string) {
    const found = await this.postRepository.getPostDetails(id as PostID);
    if (!found) throw new Error('Post not found.');

    return PostMapper.mapPostDetails(found);
  }
}
