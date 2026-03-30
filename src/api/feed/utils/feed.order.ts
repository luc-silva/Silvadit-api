import { GetFeedDTO } from '../types/feed.dto';

export class FeedOrder {
  static toGetFeed(dto: GetFeedDTO) {
    if (dto.orderField === 'date') {
      return {
        column: 'DATE',
        direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
      };
    }

    return {
      column: 'P.CONTENT',
      direction: dto.orderDirection === 'desc' ? 'DESC' : 'ASC',
    };
  }
}
