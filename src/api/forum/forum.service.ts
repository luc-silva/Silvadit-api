import { Inject, Injectable } from '@nestjs/common';
import { BanUserDTO, CreateForumDataDTO } from './types/forum.dto';
import { FORUM_REPOSITORY_TOKEN, ForumRepositoryBase } from './repository/forum.repository.base';

@Injectable()
export class ForumService {
  constructor(@Inject(FORUM_REPOSITORY_TOKEN) private forumRepository: ForumRepositoryBase) {}

  async createForum(body: CreateForumDataDTO) {
    const data: ICreateForumParams = {
      date_created: body.date_created,
      description: body.description,
      forum_id: body.forum_id as ForumID,
      name: body.forum_id,
    };
    return await this.forumRepository.createForum(data);
  }

  async getTrendingForums() {
    return await this.forumRepository.getTrendingForums();
  }

  async getForumDetails(id: string) {
    return await this.forumRepository.getForumDetails(id as ForumID);
  }

  async subscribeForum() {
    // check if user already subscribed
    // if not
    //return await this.forumRepository.followForum(body);
    // else
    //return await this.forumRepository.unfollowForum(body);
  }

  async banUserFromForum(body: BanUserDTO) {
    const data: IBanUserParams = {
      forum_id: body.forum_id as ForumID,
      user_id: body.user_id as UserID,
    };
    return await this.forumRepository.banUserFromForum(data);
  }
}
