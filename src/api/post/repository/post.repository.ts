import { getConnection } from 'src/db';
import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { PostQuery } from './post.query';
import { updateQueryHelper } from 'src/utils/updateQueryHelper';
import { PostRepositoryBase } from './post.repository.base';

export class PostRepository implements PostRepositoryBase {
  async bookmarkPost(data: IBookmarkPostParams): Promise<void> {
    const { binds, columns, values } = insertQueryHelper(
      {
        post_id: 'POST_ID',
        user_id: 'USER_ID',
        date_created: 'DATE_CREATED',
      },
      data,
    );

    const query = PostQuery.createBookmark(values, columns);

    const connection = await getConnection();
    await connection.execute(query, {
      ...binds,
      date_created: new Date(),
    });
  }

  async createPost(data: ICreatePostParams): Promise<void> {
    const connection = await getConnection();
    const query = PostQuery.createPost();

    await connection.execute(query, data);
  }

  async deletePost(postId: PostID): Promise<void> {
    const connection = await getConnection();

    const query = PostQuery.deletePost();
    await connection.execute(query, { post_id: postId });
  }

  async getPostDetails(postId: PostID) {
    const connection = await getConnection();

    const query = PostQuery.getPostDetails();

    const { rows } = await connection.execute<IPost>(query, {
      post_id: postId,
    });
    return rows && rows.length ? rows[0] : null;
  }

  async getPosts(userId: UserID): Promise<IPost[]> {
    const connection = await getConnection();

    const query = PostQuery.getPosts();

    const { rows } = await connection.execute<IPost>(query, {
      user_id: userId,
    });
    return rows && rows.length ? rows : [];
  }

  async getPostsFromSuggested(): Promise<IPost[]> {
    const connection = await getConnection();

    const query = PostQuery.getPostFromSugested();

    const { rows } = await connection.execute<IPost>(query, {});
    return rows && rows.length ? rows : [];
  }

  async getTrendingPosts(): Promise<IPost[]> {
    const connection = await getConnection();

    const query = PostQuery.getTrendingPosts();

    const { rows } = await connection.execute<IPost>(query, {});
    return rows && rows.length ? rows : [];
  }

  async reactPost(data: IReactPostParams): Promise<void> {
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

    const query = PostQuery.reactPost(values, columns);
    await connection.execute(query, {
      ...binds,
      date_created: new Date(),
    });
  }

  async unbookmarkPost(binds: IUnbookmarkPostParams): Promise<void> {
    const connection = await getConnection();

    const query = PostQuery.deleteBookmark();
    await connection.execute(query, binds);
  }

  async updatePost(data: IUpdatePostParams): Promise<void> {
    const binds = { content: data.content, is_nsfw: data.is_nsfw };

    const { queries } = updateQueryHelper(
      { content: 'CONTENT', is_nsfw: 'IS_NSFW' },
      binds,
    );

    const connection = await getConnection();

    const query = PostQuery.updatePosts(queries, data.post_id as PostID);
    await connection.execute(query, binds);
  }
}
