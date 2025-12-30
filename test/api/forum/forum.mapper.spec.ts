import { createForumCreateDto, createForumCreateParams, createForumDetailsParams, createForumOutput, createForumRaw } from "test/mock/data/forum";
import { createCompletedUserData } from "test/mock/data/user";
import { ForumMapper } from "~/api/forum/utils/forum.mapper";

describe('Mapper', () => {
  it('should map DTO into create forum params correctly', () => {
    const expected = createForumCreateParams();
    const result = ForumMapper.createForum(createForumCreateDto());

    expect(result).toEqual(expected);
  });

  it('should map query into forum details params correctly if user specified', () => {
    const expected = createForumDetailsParams();
    const userMock = createCompletedUserData({ userId: 'ABC123' });
    const forumIdMock = 'ABC';

    const result = ForumMapper.toForumDetailsParams(userMock, forumIdMock);

    expect(result).toEqual(expected);
  });

  it('should map query into forum details params correctly if user is null', () => {
    const expected = createForumDetailsParams({ user_id: null });
    const userMock = null;
    const forumIdMock = 'ABC';

    const result = ForumMapper.toForumDetailsParams(userMock, forumIdMock);

    expect(result).toEqual(expected);
  });

  it('Should map IForumRaw to IForumOutput correctly', () => {
    const raw = createForumRaw({
      description: 'lorem lorem',
      name: 'Teste',
      is_banned: 'N',
    });
    const expected = createForumOutput();

    const result = ForumMapper.toForumOutput(raw);

    expect(result).toEqual(expected);
  });
});
