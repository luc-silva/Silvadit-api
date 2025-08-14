import { Inject, Injectable } from '@nestjs/common';
import { CreatePostCommentaryDTO } from '../commentary/types/commentary.dto';
import {
  CreatePostDTO,
  DeletePostDTO,
  ReactPostDTO,
  UpdatePostDTO,
} from './types/post.dto';
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

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepositoryBase,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryBase,
    @Inject(COMMENTARY_REPOSITORY_TOKEN)
    private commentaryRepository: CommentaryRepositoryBase,
  ) {}

  async createPost(body: CreatePostDTO, session: ISession) {
    const user = await this.userRepository.getUserByIdOrUsername(session.id);
    if (!user) {
      throw new Error('User not found.');
    }

    PostValidator.createPost(body);

    const parsedData: ICreatePostParams = HomepageMapper.createPost(body, user);
    return await this.postRepository.createPost(parsedData);
  }

  async updatePost(body: UpdatePostDTO) {
    const parsedData: IUpdatePostParams = {
      ...body,
      is_nsfw: body.is_nsfw ? 'S' : 'N',
    };
    return await this.postRepository.updatePost(parsedData);
  }

  async deletePost(body: DeletePostDTO) {
    const postId = body.post_id as PostID;
    return await this.postRepository.deletePost(postId);
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
    return await this.postRepository.getPostDetails(id as PostID);
  }
}
