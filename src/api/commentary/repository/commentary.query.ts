export class CommentaryQuery {
  public static getPostCommentary() {
    return `
      SELECT *
        FROM COMMENTARY C
        WHERE C.POST_ID = :post_id
    `;
  }

  public static insertComentary(columns: string[], values: string[]) {
    return `
      INSERT INTO COMMENTARY (${columns})
      VALUES (${values})
    `;
  }

  public static updateCommentary(queries: string[]) {
    return `
      UPDATE COMMENTARY (
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
      DELETE FROM COMMENTARY
      WHERE COMMENTARY_ID = :commentary_id
    `;
  }
}
