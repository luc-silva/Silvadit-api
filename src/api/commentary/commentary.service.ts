import { Injectable } from '@nestjs/common';
import { CommentaryRepository } from './commentary.repository';

@Injectable()
export class CommentaryService {
  constructor(private commentaryRepository: CommentaryRepository) {}


  async updateCommentary() {
    return await this.commentaryRepository.updateCommentary();
  }

  async deleteCommentary() {
    return await this.commentaryRepository.deleteCommentary();
  }

  async addCommentaryReaction() {
    return await this.commentaryRepository.addCommentaryReaction();
  }

  async deleteCommentaryReaction() {
    return await this.commentaryRepository.deleteCommentaryReaction();
  }
}
