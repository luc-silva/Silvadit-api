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

  async deletePost({ post_id }: { post_id: string }) {
    const connection = await getConnection();

    const query = `
      DELETE FROM POST
      WHERE POST_ID = :post_id
    `;

    return await connection.execute(query, { post_id });
  }

  async updatePost(data: IUpdatePostData, id: string) {
    const { queries } = updateQueryHelper(
      { content: 'CONTENT', is_nsfw: 'IS_NSFW' },
      { ...data },
    );

    const connection = await getConnection();

    const query = `
      UPDATE POST (
        CONTENT
      )
      SET ${queries}
      WHERE  POST_ID = ${id}
    `;

    return await connection.execute(query, { ...data });
  }

  async reactPost(data: IReactPostData) {}

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

  async getPost({ id }: { id: string }) {
    const connection = await getConnection();

    const query = `
      SELECT CONTENT
      FROM POST
      WHERE POST_ID = :id
    `;

    const { rows } = await connection.execute(query, { id });

    return rows && rows.length ? rows[0] : null;
  }
}
