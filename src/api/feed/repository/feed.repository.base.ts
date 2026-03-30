export const FEED_REPOSITORY_TOKEN = 'FEED_REPOSITORY_TOKEN';

export interface FeedRepositoryBase {
  getFeed(filter: IGetFeedParams, order: IGetFeedOrder): Promise<IRawFeedData>;
}
