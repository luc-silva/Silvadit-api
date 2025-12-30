import {
  createForum,
  createForumMembersRaw,
  createForumOutput,
  createForumRaw,
} from 'test/mock/data/forum';
import { ForumAssembler } from '~/api/forum/utils/forum.assembler';

describe('ForumAssembler', () => {
  it('Should assemble staff with forum details ', () => {
    const forumRaw = createForumRaw({
      description: 'Lorem',
      is_banned: 'N',
      name: 'Teste',
    });
    const forumStaffRaw = [createForumMembersRaw()];

    const expected = createForum({
      forum: createForumOutput({
        description: 'Lorem',
        isBanned: false,
        name: 'Teste',
      }),
    });

    const result = ForumAssembler.toForum(forumRaw, forumStaffRaw);

    expect(result).toEqual(expected);
  });
});

//parei em criar assembler para mergear infos de staff e forum
