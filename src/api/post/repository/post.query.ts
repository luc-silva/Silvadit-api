export class PostQuery {
  public static createPost() {
    return `
      INSERT INTO POSTS (
        FORUM_ID,
        USER_ID,
        CONTENT,
        IS_NSFW,
        TITLE
      )
      VALUES (:forum_id, :user_id, :content, :title, :is_nsfw)
    `;
  }

  public static deletePost() {
    return `
      DELETE FROM POST
      WHERE POST_ID = :post_id
    `;
  }

  public static getPosts() {
    return `
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
  }

  public static getTrendingPosts() {
    return `
      SELECT CONTENT
      FROM POST P, POST_REACTIONS PR
      WHERE P.POST_ID = PR.POST_ID
      ORDER BY 
    `;
  }

  public static reactPost(values: string[], columns: string[]) {
    return `
      INSERT INTO POST_REACTIONS (${columns})
      VALUE ${values}
    `;
  }

  public static getPostFromSugested() {
    return `
      SELECT CONTENT
      FROM POST
    `;
  }

  public static getPostDetails() {
    return `
      SELECT POST_ID
      FROM POST
      WHERE POST_ID = :post_id
    `;
  }

  public static createBookmark(values: string[], columns: string[]) {
    return `
      INSERT INTO SAVED_POST (${columns})
      VALUES (${values})
    `;
  }

  public static deleteBookmark() {
    return `
      DELETE FROM SAVED_POST
      WHERE POST_ID = :post_id
        AND USER_ID = :user_id
    `;
  }

  public static updatePosts(queries: string[], postId: PostID) {
    return `
      UPDATE POST (
        CONTENT
      )
      SET ${queries}
      WHERE  POST_ID = ${postId}
    `;
  }
}
