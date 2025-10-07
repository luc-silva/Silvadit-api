export class CommentaryQuery {
  public static getCommentariesFromPost() {
    return `
      SELECT
        RAWTOHEX(C.COMMENT_ID) "id",
        RAWTOHEX(P.POST_ID) "post_id",
        RAWTOHEX(P.TITLE) "post_title",
        RAWTOHEX(C.USER_ID) "user_id",
        UA.USERNAME "user_username",
        C.CONTENT "content",
        RAWTOHEX(C.REPLY_ID) "replyId",
        C.DATE_CREATED "dateCreated",
        C.DATE_EDITED "dateEdited",
        (
          SELECT COUNT(*)
          FROM COMMENTARIES C2
          WHERE RAWTOHEX(C2.REPLY_ID) = RAWTOHEX(C.COMMENT_ID)
        ) "replies_total", 
        (
          SELECT COUNT(*)
          FROM REACTIONS R
          WHERE RAWTOHEX(R.COMMENT_ID) = RAWTOHEX(C.COMMENT_ID)
        ) "likes"
      FROM COMMENTARIES C, USER_ACCOUNTS UA, POSTS P
      WHERE RAWTOHEX(C.USER_ID) = RAWTOHEX(UA.USER_ID)
        AND RAWTOHEX(C.POST_ID) = RAWTOHEX(P.POST_ID)
        AND RAWTOHEX(C.POST_ID) = :post_id
        AND C.REPLY_ID IS NULL
    `;
  }

  public static getReplies() {
    return `
      SELECT
        RAWTOHEX(C.COMMENT_ID) "id",
        RAWTOHEX(P.POST_ID) "post_id",
        RAWTOHEX(P.TITLE) "post_title",
        RAWTOHEX(C.USER_ID) "user_id",
        UA.USERNAME "user_username",
        C.CONTENT "content",
        RAWTOHEX(C.REPLY_ID) "replyId",
        C.DATE_CREATED "dateCreated",
        C.DATE_EDITED "dateEdited",
        (
          SELECT COUNT(*)
          FROM COMMENTARIES C2
          WHERE RAWTOHEX(C2.REPLY_ID) = RAWTOHEX(C.COMMENT_ID)
        ) "replies_total", 
        (
          SELECT COUNT(*)
          FROM REACTIONS R
          WHERE RAWTOHEX(R.COMMENT_ID) = RAWTOHEX(C.COMMENT_ID)
        ) "likes"
      FROM COMMENTARIES C, USER_ACCOUNTS UA, POSTS P
      WHERE RAWTOHEX(C.USER_ID) = RAWTOHEX(UA.USER_ID)
        AND RAWTOHEX(C.POST_ID) = RAWTOHEX(P.POST_ID)
        AND RAWTOHEX(C.REPLY_ID) = :id
    `;
  }
  
  public static getCommentary() {
    return `
      SELECT COMMENT_ID
      FROM COMMENTARIES C
      WHERE RAWTOHEX(C.COMMENT_ID) = :id
    `
  }

  public static insertComentary() {
    return `
      INSERT INTO COMMENTARIES (
        POST_ID,
        CONTENT,
        REPLY_ID,
        USER_ID
      )
      VALUES (
        :postId,
        :content,
        :replyId,
        :userId
      )
    `;
  }

  public static updateCommentary(queries: string[]) {
    return `
      UPDATE COMMENTARIES (
        CONTENT
      )
      SET ${queries}
    `;
  }

  public static deleteCommentary() {
    return `
      DELETE FROM COMMNETARY
      WHERE COMMENTARY_ID = :commentary_id
    `;
  }

  public static addCommentaryReaction(columns: string[], values: string[]) {
    return `
      INSERT INTO COMMENTARY_REACTIONS (${columns})
      VALUES (${values})
    `;
  }

  public static removeCommentaryReaction() {
    return `
      DELETE FROM COMMENTARIES
      WHERE COMMENTARY_ID = :commentary_id
    `;
  }
}
