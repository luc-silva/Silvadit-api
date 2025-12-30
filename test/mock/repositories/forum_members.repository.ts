import { ForumMembersRepositoryBase } from '~/api/forum_members/repository/forum_members.repository.base';

export class MockForumMembersRepository implements ForumMembersRepositoryBase {
  getForumsFromUser = jest.fn<Promise<ISubscribedForumRaw[]>, [UserID]>();
  checkIfUserSubscribed = jest.fn<Promise<number | null>, [UserID, ForumID]>();
  unsubscribeUser = jest.fn<Promise<void>, [IUnsubscribeUserParams]>();
  subscribeUser = jest.fn<Promise<void>, [ISubscribeUserParams]>();
  getForumMembers = jest.fn<
    Promise<IForumMemberRaw[]>,
    [IGetForumMembersParams, IGetForumMembersOrder]
  >();
  getForumStaff = jest.fn<Promise<IForumMemberRaw[]>, [IGetForumStaffParams]>();
}
