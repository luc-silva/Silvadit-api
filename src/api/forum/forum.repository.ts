import { Injectable } from '@nestjs/common';
import { getConnection } from 'src/db';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';

@Injectable()
export class ForumRepository {
  async createForum(data: ICreateForumData) {
    const { binds, columns, values } = insertQueryHelper(
      {
        name: 'USER_ID',
        description: 'POST_ID',
        forum_id: 'FORUM_ID',
        date_created: 'DATE_CREATED',
      },
      data,
    );
    const query = `
      INSERT INTO FORUM (${columns})
      VALUES (${values})
    `;

    const connection = await getConnection();
    return await connection.execute(query, binds);
  }

  async getForumDetails(forum_id: string) {
    const query = `
      SELECT *
      FROM FORUM
      WHERE FORUM_ID = :forum_id
    `;

    const connection = await getConnection();
    return await connection.execute(query, { forum_id });
  }

  async updateForum(data: IUpdateForumData) {
    const { queries } = updateQueryHelper(
      {
        name: 'NAME',
        description: 'DESCRIPTION',
      },
      data,
    );
    const query = `
      UPDATE COMMENTARY
      SET ${queries}
      WHERE 
    `;

    const connection = await getConnection();
    return await connection.execute(query, { ...data });
  }

  async getTrendingForums() {
    const query = `
      SELECT *
      FROM FORUM
      WHERE 1 = 1
    `;

    const connection = await getConnection();
    return await connection.execute(query, {});
  }

  async followForum(data: IFollowForumData) {
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

    const query = `
      INSERT INTO FORUM_FOLLOWER (${columns})
      VALUE (${values})
    `;

    const connection = await getConnection();
    return await connection.execute(query, binds);
  }

  async unfollowForum(data: IUnfollowForumData) {
    const query = `
      DELETE FROM FORUM_FOLLOWER
      WHERE FORUM_ID = :forum_id
            USER_ID = :user_id
    `;

    const connection = await getConnection();
    return await connection.execute(query, {});
  }

  async banUserFromForum(data: IBanUser) {}
}
