import { createGetFeedDataDTO } from 'test/mock/data/feed';
import { FeedOrder } from '~/api/feed/utils/feed.order';

describe('FeedOrder', () => {
  it('Should order correctly if no order specified', () => {
    const dtoMock = createGetFeedDataDTO({
      orderDirection: undefined,
      orderField: undefined,
    });
    const expected = {
      column: 'P.CONTENT',
      direction: 'ASC',
    };

    const result = FeedOrder.toGetFeed(dtoMock);

    expect(result).toEqual(expected);
  });

  it('Should order correctly', () => {
    const dtoMock = createGetFeedDataDTO({
      orderDirection: 'desc',
      orderField: 'date',
    });
    const expected = {
      column: 'DATE',
      direction: 'DESC',
    };

    const result = FeedOrder.toGetFeed(dtoMock);

    expect(result).toEqual(expected);
  });
});
