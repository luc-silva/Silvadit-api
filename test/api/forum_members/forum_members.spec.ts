import {
  createSubscribedForumOutputData,
  createSubscribedForumRawData,
} from 'test/mock/data/forum_members';
import { ForumMembersMapper } from '~/api/forum_members/utils/forum_members.mapper';

describe('Mapper', () => {
  it('Should map raw data correctly', () => {
    const rawData = createSubscribedForumRawData();
    const expected = createSubscribedForumOutputData();

    const mapped = ForumMembersMapper.subscribedForum(rawData);

    expect(mapped).toEqual(expected);
  });
});
