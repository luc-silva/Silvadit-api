import { CreateForumDataDTO } from '../types/forum.dto';

export class ForumMapper {
  static createForum(data: CreateForumDataDTO): ICreateForumParams {
    return {
      description: data.description,
      is_nsfw: data.isNsfw ? 'S' : 'N',
      is_private: data.isPrivate ? 'S' : 'N',
      name: data.name,
    };
  }
}
