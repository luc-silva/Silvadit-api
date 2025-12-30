export class ForumQuery {
  public static createForum() {
    return `
      INSERT INTO FORUMS (
        NAME,
        DESCRIPTION,
        IS_PRIVATE,
        IS_NSFW
      )
      VALUES (
        :name,
        :description,
        :is_private,
        :is_nsfw
      )
      RETURNING RAWTOHEX(FORUM_ID)
      INTO :id
    `;
  }

  public static getForumDetails() {
    return `
      SELECT 
        F.NAME "name",
        F.DESCRIPTION "description",
        F.IS_PRIVATE "is_private",
        F.BANNED "banned",
        F.IS_NSFW "is_nsfw",
        F.DATE_CREATED "date_created",
        F.DATE_EDITED "date_edited",
        RAWTOHEX(F.FORUM_ID) "forum_id",
        (
          SELECT
            (
              CASE WHEN COUNT(*) > 0
                THEN 'S'
                ELSE 'N'
              END
            )
          FROM FORUM_MEMBERS FM2
          WHERE RAWTOHEX(FM2.FORUM_ID) = :forum_id
            AND RAWTOHEX(FM2.USER_ID) = :user_id
        ) "is_following",
        (
          SELECT COUNT(*)
          FROM FORUM_MEMBERS
          WHERE RAWTOHEX(FORUM_ID) = :forum_id
        ) "followers_total",
        (
          SELECT COUNT(*)
          FROM POSTS
          WHERE RAWTOHEX(FORUM_ID) = :forum_id
        ) "posts_total"
      FROM FORUMS F
      WHERE RAWTOHEX(FORUM_ID) = :forum_id
    `;
  }

  public static getForumById() {
    return `
      SELECT 
        F.NAME "name",
        F.DESCRIPTION "description",
        F.IS_PRIVATE "is_private",
        F.BANNED "banned",
        F.IS_NSFW "is_nsfw",
        F.DATE_CREATED "date_created",
        F.DATE_EDITED "date_edited",
        RAWTOHEX(F.FORUM_ID) "forum_id",
        (
          SELECT COUNT(*)
          FROM FORUM_MEMBERS
          WHERE FORUM_ID = :forum_id
        ) "followers_total",
        (
          SELECT COUNT(*)
          FROM POSTS
          WHERE FORUM_ID = :forum_id
        ) "posts_total"
      FROM FORUMS F
      WHERE RAWTOHEX(FORUM_ID) = :forum_id

    `;
  }

  public static updateForum(queries: string[]) {
    return `
      UPDATE COMMENTARY
      SET ${queries}
      WHERE 
    `;
  }

  public static getTrendingForums() {
    return `
      SELECT *
      FROM FORUM
      WHERE 1 = 1
    `;
  }

  public static followForum(columns: string[], values: string[]) {
    return `
      INSERT INTO FORUM_FOLLOWER (${columns})
      VALUE (${values})
    `;
  }

  public static unfollowForum() {
    return `
      DELETE FROM FORUM_FOLLOWER
      WHERE FORUM_ID = :forum_id
        USER_ID = :user_id
    `;
  }

  public static getUserSubscribedForums() {
    return `
      SELECT 
        F.FORUM_ID "forumId",
        F.NAME "name",
        F.DESCRIPTION "description",
        F.DATE_CREATED "dateCreated",
        F.DATE_EDITED "dateEdited",
        F.BANNED "banned",
        FM.DATE_CREATED "dateSubscribed",
        FM.IS_FOUNDER "isFounder",
        FM.IS_ADMIN "isAdmin"
      FROM FORUMS F, FORUMS_MEMBERS FM
      WHERE RAWTOHEX(F.FORUM_ID) = RAWTOHEX(FM.FORUM_ID)(+)
        AND FM.USER_ID = :userId
    `;
  }
}
