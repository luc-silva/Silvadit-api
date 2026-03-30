import { insertQueryHelper } from 'src/utils/insertQueryHelper';
import { PostQuery } from './post.query';
import { PostRepositoryBase } from './post.repository.base';
import { getConnection } from '~/db';

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
    const { rows } = await connection.execute<IPostRaw>(query, {
      postId,
    });
    return rows && rows.length ? rows[0] : null;
  }

  async getPosts(filter: IGetPostsParams): Promise<IPostRaw[]> {
    const connection = await getConnection();

    const query = PostQuery.getPosts(filter);

    console.log(filter)
    const { rows } = await connection.execute<IPostRaw>(query, filter);
    return rows && rows.length ? rows : [];
  }

  async getPostsFromSuggested(): Promise<IPostRaw[]> {
    const connection = await getConnection();

    const query = PostQuery.getPostFromSugested();

    const { rows } = await connection.execute<IPostRaw>(query, {});
    return rows && rows.length ? rows : [];
  }

  async getTrendingPosts(): Promise<IPostRaw[]> {
    const connection = await getConnection();

    const query = PostQuery.getTrendingPosts();

    const { rows } = await connection.execute<IPostRaw>(query, {});
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
    const connection = await getConnection();

    const query = PostQuery.updatePosts();
    await connection.execute(query, data);
  }
}
