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

  async checkIfUserSubscribed(
    user_id: UserID,
    forum_id: ForumID,
  ): Promise<number | null> {
    const connection = await getConnection();

    const query = ForumMembersQuery.checkIfUserSubscribed();

    const { rows } = await connection.execute<number>(query, {
      user_id,
      forum_id,
    });
    return rows ? rows[0] : null;
  }

  async subscribeUser(params: ISubscribeUserParams): Promise<void> {
    const connection = await getConnection();

    const query = ForumMembersQuery.subscribe();

    await connection.execute(query, params);
  }

  async unsubscribeUser(params: IUnsubscribeUserParams): Promise<void> {
    const connection = await getConnection();

    const query = ForumMembersQuery.unsubscribe();

    await connection.execute(query, params);
  }

  async getForumMembers(
    params: IGetForumMembersParams,
    order: IGetForumMembersOrder,
  ): Promise<IForumMemberRaw[]> {
    const connection = await getConnection();

    const query = ForumMembersQuery.getForumMembers(params, order);

    const { rows } = await connection.execute<IForumMemberRaw>(query, params);
    return rows ? rows : [];
  }

  async getForumStaff(
    params: IGetForumStaffParams,
  ): Promise<IForumMemberRaw[]> {
    const connection = await getConnection();

    const query = ForumMembersQuery.getForumStaff();

    const { rows } = await connection.execute<IForumMemberRaw>(query, params);
    return rows ? rows : [];
  }
}
