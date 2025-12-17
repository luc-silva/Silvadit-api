import { ForumMembersRepositoryBase } from '~/api/forum_members/repository/forum_members.repository.base';

export class MockForumMembersRepository implements ForumMembersRepositoryBase {
  getForumsFromUser = jest.fn<Promise<ISubscribedForumRaw[]>, [UserID]>();
}
