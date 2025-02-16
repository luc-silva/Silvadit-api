import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CommentaryRepository } from '../commentary/commentary.repository';
import { CreatePostCommentaryDTO } from '../commentary/commentary.dto';
import {
  CreatePostDTO,
  DeletePostDTO,
  ReactPostDTO,
  UpdatePostDTO,
} from './post.dto';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentaryRepository: CommentaryRepository,
  ) {}

  async getTrendingPosts() {
    return await this.postRepository.getTrendingPosts();
  }

  async createPost(body: CreatePostDTO) {
    const parsedData: ICreatePost = {
      ...body,
      is_nsfw: body.is_nsfw ? 'S' : 'N',
    };

    return await this.postRepository.createPost(parsedData);
  }

  async updatePost(body: UpdatePostDTO) {
    const parsedData: IUpdatePostData = {
      ...body,
      is_nsfw: body.is_nsfw ? 'S' : 'N',
    };
    return await this.postRepository.updatePost(parsedData );
  }

  async deletePost(body: DeletePostDTO) {
    return await this.postRepository.deletePost(body);
  }

  async reactPost(body: ReactPostDTO) {
    const parsedData: IReactPostData = {
      ...body,
      date_created: new Date(),
      is_upvote: body.is_upvote ? 'S' : 'N',
    };
    return await this.postRepository.reactPost(parsedData);
  }

  async getPostComentaries(post_id: string) {
    return await this.commentaryRepository.getPostCommentaries({ post_id });
  }

  async createPostCommentary(body: CreatePostCommentaryDTO) {
    return await this.commentaryRepository.createCommentary(body);
  }

  async getPostDetails(id: string) {
    return await this.postRepository.getPostDetails({ post_id: id });
  }
}
