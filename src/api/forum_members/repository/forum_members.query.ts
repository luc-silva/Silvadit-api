export class ForumMembersQuery {
  static getForumsFromUserId() {
    return `
      SELECT
        DISTINCT FM.IS_ADMIN "is_admin",
        FM.IS_FOUNDER "is_founder",
        FM.DATE_CREATED "member_since",
        FM.FORUM_ID "forum_id",
        F.NAME "forum_name",
        F.DESCRIPTION "forum_description"
      FROM
        FORUM_MEMBERS FM, FORUMS F
      WHERE RAWTOHEX(FM.FORUM_ID) = RAWTOHEX(F.FORUM_ID)
        AND RAWTOHEX(FM.USER_ID) = :id
    `;
  }
}
