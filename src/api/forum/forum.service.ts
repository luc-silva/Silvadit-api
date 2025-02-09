import { Injectable } from '@nestjs/common';
import { ForumRepository } from './forum.repository';

@Injectable()
export class ForumService {
   constructor(private forumRepository: ForumRepository){}

  async getTrendingForums() {}

  async getForumSubscribed(id: string) {}

  async followForum() {}

  async unfollowForum() {}

  async banUserFromForum() {}
}
