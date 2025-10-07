import { getConnection } from 'src/db';
import { CommentaryQuery } from './commentary.query';
import { CommentaryRepositoryBase } from './commentary.repository.base';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';
import { Injectable } from '@nestjs/common';
import { OUT_FORMAT_OBJECT } from 'oracledb';

@Injectable()
export class CommentaryRepository implements CommentaryRepositoryBase {
  async getCommentariesFromPost(post_id: PostID) {
    const connection = await getConnection();

    const query = CommentaryQuery.getCommentariesFromPost();
    const { rows } = await connection.execute<ICommentaryRaw>(
      query,
      {
        post_id,
      },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows : [];
  }

  async getReplies(commentary_id: CommentaryID) {
    const connection = await getConnection();

    const query = CommentaryQuery.getReplies();
    const { rows } = await connection.execute<ICommentaryRaw>(
      query,
      {
        id: commentary_id,
      },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows : [];
  }

  async getCommentary(commentary_id: CommentaryID) {
    const connection = await getConnection();

    const query = CommentaryQuery.getCommentary();
    const { rows } = await connection.execute<ICommentaryRaw>(
      query,
      {
        id: commentary_id,
      },
      { outFormat: OUT_FORMAT_OBJECT },
    );
    return rows && rows.length ? rows[0] : null;
  }

  async createCommentary(body: ICreateCommentaryParams) {
    const query = CommentaryQuery.insertComentary();
    const connection = await getConnection();
    await connection.execute(query, body);
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
