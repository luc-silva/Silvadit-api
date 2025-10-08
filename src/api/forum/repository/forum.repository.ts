import { Injectable } from '@nestjs/common';
import { getConnection } from 'src/db';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';
import { ForumRepositoryBase } from './forum.repository.base';
import { ForumQuery } from './forum.query';
import { OUT_FORMAT_OBJECT } from 'oracledb';

@Injectable()
export class ForumRepository implements ForumRepositoryBase {
  async createForum(data: ICreateForumParams) {
    const connection = await getConnection();

    const query = ForumQuery.createForum();
    await connection.execute(query, data, {});
  }

  async getForumDetails(forum_id: ForumID) {
    const connection = await getConnection();

    const query = ForumQuery.getForumDetails();
    const { rows } = await connection.execute<IForumRaw>(
      query,
      { forum_id },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async updateForum(data: IUpdateForumParams) {
    const { queries } = updateQueryHelper(
      {
        name: 'NAME',
        description: 'DESCRIPTION',
      },
      data,
    );
    const query = ForumQuery.updateForum(queries);

    const connection = await getConnection();
    await connection.execute(query, { ...data });
  }

  async getTrendingForums() {
    const query = ForumQuery.getTrendingForums();

    const connection = await getConnection();
    const { rows } = await connection.execute<IForumRaw>(query, {});
    return rows && rows.length ? rows : [];
  }

  async followForum(data: IFollowForumParams) {
    const connection = await getConnection();
    const { binds, columns, values } = insertQueryHelper(
      {
        forum_id: 'FORUM_ID',
        user_id: 'USER_ID',
        is_admin: 'IS_ADMIN',
        is_founder: 'IS_FOUNDER',
        date_created: 'DATE_CREATED',
      },
      data,
    );

    const query = ForumQuery.followForum(columns, values);
    await connection.execute(query, binds);
  }

  async unfollowForum(data: IUnfollowForumParams) {
    const connection = await getConnection();

    const query = ForumQuery.unfollowForum();
    await connection.execute(query, data);
  }

  async banUserFromForum(data: IBanUserParams) {}

  async getForumsFromUser(userId: UserID): Promise<ISubscribedForum[]> {
    const connection = await getConnection();

    const query = ForumQuery.getUserSubscribedForums();
    const { rows } = await connection.execute<ISubscribedForum>(query, {
      userId,
    });

    return rows ?? [];
  }
}
