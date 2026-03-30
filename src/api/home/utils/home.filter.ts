import { GetFeedDTO } from '../types/home.dto';

export interface IGetFeedFilters extends IGetPostsParams {}

export class HomeFilter {
  static createFeedFilters(dto: GetFeedDTO): IGetFeedFilters {
    const filter = {} as IGetFeedFilters;

    if (dto.forumId) {
      filter.forum_id = dto.forumId;
    }

    if (dto.fromUserId) {
      filter.from_user_id = dto.fromUserId;
    }

    return {
      ...filter,
      items_per_page: dto.itemsPerPage,
      page: dto.page,
      nsfw: !dto.isNsfw ? 'N' : dto.isNsfw,
    };
  }
}
