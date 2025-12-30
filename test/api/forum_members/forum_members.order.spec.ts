import { createGetForumMemberFilterDTO } from 'test/mock/data/forum';
import { ForumMembersOrder } from '~/api/forum_members/utils/forum_members.order';

describe('ForumMembersOrder', () => {
  it('Should return order correctly if not order specified', () => {
    const data = createGetForumMemberFilterDTO({
      orderDirection: undefined,
      orderField: undefined,
    });

    const expected = {
      column: "UA.FIRST_NAME || '' || UA.LAST_NAME",
      direction: 'ASC',
    };
    const result = ForumMembersOrder.toMembersFiltersOrder(data);

    expect(result).toEqual(expected);
  });

  it('Should return order correctly if order by name specified', () => {
    const data = createGetForumMemberFilterDTO({
      orderDirection: 'desc',
      orderField: 'name',
    });

   const expected = {
      column: "UA.FIRST_NAME || '' || UA.LAST_NAME",
      direction: 'DESC',
    };
    const result = ForumMembersOrder.toMembersFiltersOrder(data);

    expect(result).toEqual(expected);
  });

  it('Should return order correctly if order by date specified', () => {
    const data = createGetForumMemberFilterDTO({
      orderDirection: 'asc',
      orderField: 'date',
    });

   const expected = {
      column: "UA.DATE_CREATED",
      direction: 'ASC',
    };
    const result = ForumMembersOrder.toMembersFiltersOrder(data);

    expect(result).toEqual(expected);
  });
});
