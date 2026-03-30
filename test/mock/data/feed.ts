import { GetFeedDTO } from '~/api/feed/types/feed.dto';

export const createGetFeedDataDTO = (
  data?: Partial<GetFeedDTO>,
): GetFeedDTO => {
  return {
    itemsPerPage: 10,
    page: 1,
    orderDirection: 'asc',
    orderField: 'search',
    type: 'all',
    ...data,
  };
};

export const createGetFeedDataParams = (
  data?: Partial<IGetFeedParams>,
): IGetFeedParams => {
  return {
    items_per_page: 10,
    page: 1,
    type: 'all',
    ...data,
  };
};
