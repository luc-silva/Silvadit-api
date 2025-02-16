import { Injectable } from '@nestjs/common';
import { getConnection } from 'src/db';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';

@Injectable()
export class PostRepository {
  async createPost(data: ICreatePost) {
    const connection = await getConnection();

    const { binds, columns, values } = insertQueryHelper(
      {
        forum_id: 'FORUM_ID',
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        content: 'CONTENT',
        is_nsfw: 'IS_NSFW',
        date_created: 'DATE_CREATED',
      },
      data,
    );

    const query = `
      INSERT INTO POST (${columns})
      VALUES (${values})
    `;

    return await connection.execute(query, binds);
  }

  async deletePost({ post_id }: IDeletePostData) {
    const connection = await getConnection();

    const query = `
      DELETE FROM POST
      WHERE POST_ID = :post_id
    `;

    return await connection.execute(query, { post_id });
  }

  async updatePost(data: IUpdatePostData) {
    const binds = { content: data.content, is_nsfw: data.is_nsfw };

    const { queries } = updateQueryHelper(
      { content: 'CONTENT', is_nsfw: 'IS_NSFW' },
      binds,
    );

    const connection = await getConnection();

    const query = `
      UPDATE POST (
        CONTENT
      )
      SET ${queries}
      WHERE  POST_ID = ${data.post_id}
    `;

    return await connection.execute(query, binds);
  }

  async reactPost(data: IReactPostData) {
    const { binds, columns, values } = insertQueryHelper(
      {
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        is_upvote: 'IS_UPVOTE',
        date_created: 'DATE_CREATED',
      },
      data,
    );

    const connection = await getConnection();

    const query = `
      INSERT INTO POST_REACTIONS (${columns})
      VALUE ${values}
    `;

    return await connection.execute(query, {
      ...binds,
      date_created: new Date(),
    });
  }

  async getTrendingPosts() {
    const connection = await getConnection();

    const query = `
      SELECT CONTENT
      FROM POST P, POST_REACTIONS PR
      WHERE P.POST_ID = PR.POST_ID
      ORDER BY 
    `;

    const { rows } = await connection.execute(query, {});

    return rows && rows.length ? rows[0] : null;
  }

  async getPosts({ user_id }: { user_id: string }) {
    const connection = await getConnection();

    const query = `
      WITH FOLLOWED_FORUMS_ AS (
        SELECT FF.FORUM_ID, FF.USER_ID
        FROM FORUM F, FORUM_FOLLOWED FF
        WHERE F.FORUM_ID = FF.FORUM_ID(+)
      )
      SELECT P.CONTENT
      FROM POST P, FOLLOWED_FORUMS FF
      WHERE P.FORUM_ID = FF.FORUM_ID(+)
      AND FF.USER_ID = :user_id
    `;

    const { rows } = await connection.execute(query, { user_id });

    return rows && rows.length ? rows[0] : null;
  }

  async getPostsFromSuggested() {
    const connection = await getConnection();

    const query = `
      SELECT CONTENT
      FROM POST
      
    `;

    const { rows } = await connection.execute(query, {});

    return rows && rows.length ? rows[0] : null;
  }

  async getPostDetails({ post_id }: IGetPostDetails) {
    const connection = await getConnection();

    const query = `
      SELECT POST_ID
      FROM POST
      WHERE POST_ID = :post_id
    `;

    const { rows } = await connection.execute(query, { post_id });

    return rows && rows.length ? rows[0] : null;
  }

  async bookmarkPost(data: IBookmarkPostData) {
    const { binds, columns, values } = insertQueryHelper(
      {
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        date_created: 'DATE_CREATED',
      },
      data,
    );

    const query = `
      INSERT INTO SAVED_POST (${columns})
      VALUES (${values})
    `;

    const connection = await getConnection();
    return await connection.execute(query, {
      ...binds,
      date_created: new Date(),
    });
  }

  async unbookmarkPost(binds: IUnbookmarkPostData) {
    const connection = await getConnection();

    const query = `
      DELETE FROM SAVED_POST
      WHERE POST_ID = :post_id
        AND USER_ID = :user_id
    `;

    return await connection.execute(query, binds);
  }
}
