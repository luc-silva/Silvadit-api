export class CommentaryQuery {
  public static getCommentariesFromPost() {
    return `
      SELECT
        C.COMMENT_ID "id",
        C.POST_ID "postId",
        C.USER_ID "user_id",
        UA.USERNAME "username",
        C.CONTENT "content",
        C.REPLY_ID "replyId",
        C.DATE_CREATED "dateCreated",
        C.DATE_EDITED "dateEdited"
      FROM COMMENTARIES C, USER_ACCOUNTS UA, POSTS P
      WHERE RAWTOHEX(C.USER_ID) = RAWTOHEX(UA.USER_ID)
        AND RAWTOHEX(C.POST_ID) = RAWTOHEX(P.POST_ID)
        AND C.POST_ID = :post_id
    `;
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
