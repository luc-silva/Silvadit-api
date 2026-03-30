import {
  createGetFeedDataDTO,
  createGetFeedDataParams,
} from 'test/mock/data/feed';
import { FeedMapper } from '~/api/feed/utils/feed.mapper';

describe('FeedMapper', () => {
  it('Should map feed params correctly', () => {
    const expected = createGetFeedDataParams();
    const dto = createGetFeedDataDTO();

    const result = FeedMapper.toGetFeedParams(dto);

    expect(result).toEqual(expected);
  });
});
