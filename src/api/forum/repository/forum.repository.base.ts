export const FORUM_REPOSITORY_TOKEN = 'FORUM_REPOSITORY_TOKEN';

export interface ForumRepositoryBase {
  createForum(data: ICreateForumParams): Promise<ICreateForumReturn>;

  getForumDetails(params: IForumDetailsParams): Promise<IForumRaw | null>;

  getForumById(forum_id: ForumID): Promise<IForumRaw | null>;

  updateForum(data: IUpdateForumParams): Promise<void>;

  getTrendingForums(): Promise<IForumRaw[]>;

  followForum(data: IFollowForumParams): Promise<void>;

  unfollowForum(data: IUnfollowForumParams): Promise<void>;

  banUserFromForum(data: IBanUserParams): Promise<void>;
}
