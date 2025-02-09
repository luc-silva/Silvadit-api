import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CommentaryRepository } from '../commentary/commentary.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentaryRepository: CommentaryRepository,
  ) {}

  async getTrendingPosts() {}

  async createPost() {}

  async updatePost() {}

  async deletePost() {}

  async reactPost() {}

  async getPostComentaries() {}
}
