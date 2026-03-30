import { GetFeedDTO } from '../types/feed.dto';

export class FeedMapper {
  static toGetFeedParams(dto: GetFeedDTO): IGetFeedParams {
    return {
      items_per_page: dto.itemsPerPage,
      page: dto.page,
      type: dto.type,
    };
  }
}
