import { getConnection } from '~/db';
import { ForumMembersQuery } from './forum_members.query';
import { ForumMembersRepositoryBase } from './forum_members.repository.base';

export class ForumMembersRepository implements ForumMembersRepositoryBase {
  async getForumsFromUser(userId: UserID): Promise<ISubscribedForumRaw[]> {
    const connection = await getConnection();

    const query = ForumMembersQuery.getForumsFromUserId();

    const { rows } = await connection.execute<ISubscribedForumRaw>(query, {
      id: userId,
    });
    return rows ? rows : [];
  }
}
