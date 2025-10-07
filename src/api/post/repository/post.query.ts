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
      VALUES (:forum_id, :user_id, :content, :is_nsfw, :title)
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
      SELECT 
        RAWTOHEX(P.POST_ID) "post_id",
        P.CONTENT "post_content",
        P.TITLE "post_title",
        P.IS_NSFW "post_is_nsfw",
        P.DATE_CREATED "post_date_created",
        P.DATE_EDITED "post_date_edited",
        RAWTOHEX(UA.USER_ID) "owner_id",
        UA.USERNAME "owner_username",
        (
          SELECT COUNT(*)
          FROM USER_FOLLOWERS UF
          WHERE RAWTOHEX(UF.FOLLOWING_USER) = RAWTOHEX(UA.USER_ID)
        ) "owner_followers",
        RAWTOHEX(F.FORUM_ID) "forum_id",
        F.NAME "forum_name",
        F.DESCRIPTION "forum_description",
        (
          SELECT COUNT(*)
          FROM FORUM_MEMBERS FM
          WHERE RAWTOHEX(FM.FORUM_ID) = RAWTOHEX(F.FORUM_ID)
        ) "forum_followers"
      FROM POSTS P
      LEFT JOIN USER_ACCOUNTS UA
        ON P.USER_ID = UA.USER_ID
      LEFT JOIN FORUMS F
        ON P.FORUM_ID = F.FORUM_ID
      WHERE RAWTOHEX(P.POST_ID) = :postId
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

  public static updatePosts() {
    return `
      UPDATE POSTS
      SET 
        CONTENT = :content,
        TITLE = :title,
        IS_NSFW =:is_nsfw

      WHERE  POST_ID = :post_id
    `;
  }
}
