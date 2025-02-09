import { Injectable } from '@nestjs/common';
import { CommentaryRepository } from './commentary.repository';

@Injectable()
export class CommentaryService {
   constructor(private commentaryRepository: CommentaryRepository){}
  async getPosts() {}

  async createPost() {}

  async updatePost() {}

  async deletePost() {}

  async reactPost() {}
}
