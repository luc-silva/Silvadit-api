import { ForumRepositoryBase } from '~/api/forum/repository/forum.repository.base';

export class MockForumRepository implements jest.Mocked<ForumRepositoryBase> {
  createForum = jest.fn<Promise<void>, [ICreateForumParams]>();

  getForumDetails = jest.fn<Promise<IForumRaw | null>, [ForumID]>();

  updateForum = jest.fn<Promise<void>, [IUpdateForumParams]>();

  getTrendingForums = jest.fn<Promise<IForumRaw[]>, []>();

  followForum = jest.fn<Promise<void>, [IFollowForumParams]>();

  unfollowForum = jest.fn<Promise<void>, [IUnfollowForumParams]>();

  banUserFromForum = jest.fn<Promise<void>, [IBanUserParams]>();

  getForumsFromUser = jest.fn<Promise<ISubscribedForum[]>, [UserID]>();
}
