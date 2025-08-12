import { getConnection } from 'src/db';
import { CommentaryQuery } from './commentary.query';
import { CommentaryRepositoryBase } from './commentary.repository.base';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentaryRepository implements CommentaryRepositoryBase {
  async getPostCommentaries(post_id: PostID) {
    const connection = await getConnection();

    const query = CommentaryQuery.getPostCommentary();
    const { rows } = await connection.execute<ICommentary>(query, { post_id });
    return rows && rows.length ? rows : [];
  }

  async createCommentary(body: ICreateCommentaryParams) {
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

    const query = CommentaryQuery.insertComentary(columns, values);
    const connection = await getConnection();
    await connection.execute(query, binds);
  }

  async updateCommentary(data: IUpdateCommentaryParams) {
    const { queries } = updateQueryHelper({ content: 'CONTENT' }, data);

    const connection = await getConnection();
    const query = CommentaryQuery.updateCommentary(queries);
    await connection.execute(query, data);
  }

  async deleteCommentary(id: string) {
    const connection = await getConnection();

    const query = CommentaryQuery.deleteCommentary();
    await connection.execute(query, { id });
  }

  async reactCommentary(data: IReactCommentaryParams) {
    const connection = await getConnection();
    const { binds, columns, values } = insertQueryHelper(
      {
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        commentary_id: 'COMMENTARY_ID',
        date_created: 'DATE_CREATED',
        is_upvote: 'IS_UPVOTE',
      },
      data,
    );

    const query = CommentaryQuery.addCommentaryReaction(columns, values);
    await connection.execute(query, binds);
  }

  async deleteCommentaryReaction(commentaryId: CommentaryID) {
    const connection = await getConnection();
    const query = CommentaryQuery.removeCommentaryReaction();
    await connection.execute(query, { commentaryId });
  }
}
