export class ForumQuery {
  public static createForum(columns: string[], values: string[]) {
    return `
      INSERT INTO FORUM (${columns})
      VALUES (${values})
    `;
  }

  public static getForumDetails() {
    return `
      SELECT *
      FROM FORUM
      WHERE FORUM_ID = :forum_id
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
    `
  }
}
