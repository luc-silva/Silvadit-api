import { Injectable } from '@nestjs/common';
import { ForumRepository } from './forum.repository';
import {
  BanUserDTO,
  CreateForumDataDTO,
  FollowForumDataDTO,
  UnfollowForumDataDTO,
} from './forum.dto';

@Injectable()
export class ForumService {
  constructor(private forumRepository: ForumRepository) {}

  async createForum(body: CreateForumDataDTO) {
    return await this.forumRepository.createForum(body);
  }

  async getTrendingForums() {
    return await this.forumRepository.getTrendingForums();
  }

  async getForumDetails(id: string) {
    return await this.forumRepository.getForumDetails(id);
  }

  async followForum(body: FollowForumDataDTO) {
    return await this.forumRepository.followForum(body);
  }

  async unfollowForum(body: UnfollowForumDataDTO) {
    return await this.forumRepository.unfollowForum(body);
  }

  async banUserFromForum(body: BanUserDTO) {
    return await this.forumRepository.banUserFromForum(body);
  }
}
