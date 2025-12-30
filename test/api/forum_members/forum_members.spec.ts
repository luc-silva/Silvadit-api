import {
  createForumMembersOutput,
  createForumMembersRaw,
  createGetForumMemberFilterDTO,
  createGetForumMembersParams,
  createSubscribeParams,
  createUnsubscribeParams,
} from 'test/mock/data/forum';
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

  it('Should map IForumMembersRaw to IForumOutput correctly', () => {
    const raw = createForumMembersRaw();
    const expected = createForumMembersOutput();

    const result = ForumMembersMapper.toForumMembersOutput(raw);

    expect(result).toEqual(expected);
  });

  it('Should map correctly dto to unsubscribe params', () => {
    const expected = createUnsubscribeParams();
    const userIdMock = 'ABC123';
    const forumIdMock = 'ABC';

    const result = ForumMembersMapper.toUnsubscribeParams(
      userIdMock,
      forumIdMock,
    );

    expect(result).toEqual(expected);
  });

  it('Should map correctly dto to subscribe params', () => {
    const expected = createSubscribeParams();
    const userIdMock = 'ABC123';
    const forumIdMock = 'ABC';
    const isAdminMock = false;
    const isFounderMock = false;

    const result = ForumMembersMapper.toSubscribeParams(
      userIdMock,
      forumIdMock,
      isAdminMock,
      isFounderMock,
    );

    expect(result).toEqual(expected);
  });

  it('Should map IGetForumMembersDTO to IGetForumMembersParams correctly', () => {
    const raw = createGetForumMemberFilterDTO();
    const expected = createGetForumMembersParams();

    const result = ForumMembersMapper.toGetForumMembersParams(raw);

    expect(result).toEqual(expected);
  });
});
