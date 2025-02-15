import { Injectable } from '@nestjs/common';
import { getConnection } from 'src/db';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';

@Injectable()
export class CommentaryRepository {
  async getPostCommentaries({ post_id }: { post_id: string }) {
    const connection = await getConnection();

    const query = `
      SELECT *
      FROM COMMENTARY C
      WHERE C.POST_ID = :post_id
    `;

    return await connection.execute(query, { post_id });
  }

  async createCommentary(body: ICreateComentary) {
    const { binds, columns, values } = insertQueryHelper(
      {
        user_id: 'USER_ID',
        post_id: 'POST_ID',
        content: 'CONTENT',
        date_created: 'DATE_CREATED',
        reply_id: 'REPLY_ID',
      },
      body,
    );
    const query = `
      INSERT INTO COMMENTARY (${columns})
      VALUES (${values})
    `;

    const connection = await getConnection();

    return await connection.execute(query, binds);
  }

  async updateCommentary({ content }: { content: string }) {
    const { queries } = updateQueryHelper({ content: 'CONTENT' }, { content });

    const connection = await getConnection();

    const query = `
      UPDATE COMMENTARY (
        CONTENT
      )
      SET ${queries}
    `;

    return await connection.execute(query, { content });
  }

  async deleteCommentary({ commentary_id }: { commentary_id: string }) {
    const connection = await getConnection();

    const query = `
      DELETE FROM COMMNETARY
      WHERE COMMENTARY_ID = :commentary_id
    `;

    return await connection.execute(query, { commentary_id });
  }

  async addCommentaryReaction(data: IReactCommentaryData) {
    const connection = await getConnection();
    const { binds, columns, values } = insertQueryHelper(
      {
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        commentary_id: 'COMMENTARY_ID',
        date_created: 'DATE_CREATED',
        is_upvote: 'IS_UPVOTE',
      },
      {},
    );

    const query = `
      INSERT INTO COMMENTARY_REACTIONS (${columns})
      VALUES (${values})
    `;

    return await connection.execute(query, binds);
  }

  async deleteCommentaryReaction({ commentary_id }: { commentary_id: string }) {
    const connection = await getConnection();
    const query = `
      DELETE FROM COMMENTARY
      WHERE COMMENTARY_ID = :commentary_id
    `;

    return await connection.execute(query, { commentary_id });
  }
}
