export const FOLLOWERS_REPOSITORY_TOKEN = 'FOLLOWERS_REPOSITORY_TOKEN';

export interface FollowerRepositoryBase {
  follow(): Promise<void>;
  unfollow(): Promise<void>;
}
