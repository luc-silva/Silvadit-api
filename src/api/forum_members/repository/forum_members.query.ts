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

  static checkIfUserSubscribed() {
    return `
      SELECT 1
      FROM FORUM_MEMBERS FM
      WHERE RAWTOHEX(FM.FORUM_ID) = :forum_id
        AND RAWTOHEX(FM.USER_ID)  = :user_id
    `;
  }

  static subscribe() {
    return `
      INSERT INTO FORUM_MEMBERS (
        FORUM_ID,
        USER_ID,
        IS_ADMIN,
        IS_FOUNDER
      )
      VALUES (
        :forum_id,
        :user_id,
        :is_admin,
        :is_founder
      )
    `;
  }

  static unsubscribe() {
    return `
      DELETE FROM FORUM_MEMBERS FM
      WHERE FM.USER_ID = :user_id
        AND FM.FORUM_ID = :forum_id
    `;
  }

  static getForumMembers(
    params: IGetForumMembersParams,
    order: IGetForumMembersOrder,
  ) {
    return `
      SELECT
          UA.FIRST_NAME "first_name",
          UA.USERNAME "username",
          UA.COUNTRY "country",
          UA.DATE_CREATED "date_created",
          UA.LAST_NAME "last_name",
          UA.CITY "state",
          RAWTOHEX(UA.USER_ID) "id"
      FROM FORUM_MEMBERS FM, USER_ACCOUNTS UA
      WHERE RAWTOHEX(FM.FORUM_ID) = :forum_id
        AND RAWTOHEX(FM.USER_ID) = RAWTOHEX(UA.USER_ID)
        ${params.search ? `AND (UA.FIRST_NAME = :search OR UA.LAST_NAME = :searcH OR UA.USERNAME = :search)` : ''}
        ${params.is_admin ? `AND (NVL(UA.IS_FOUNDER, 'N') = 'S' OR NVL(UA.IS_ADMIN, 'N') = 'S')` : ''}
        ORDER BY ${order.column} ${order.direction}
      OFFSET (:items_per_page * (:page - 1)) ROWS FETCH NEXT :items_per_page ROWS ONLY
    `;
  }

  static getForumStaff() {
    return `
      SELECT
        UA.FIRST_NAME "first_name",
        UA.USERNAME "username",
        UA.COUNTRY "country",
        UA.DATE_CREATED "date_created",
        UA.LAST_NAME "last_name",
        UA.CITY "state",
        RAWTOHEX(UA.USER_ID) "id",
        RAWTOHEX(FM.FORUM_ID)
      FROM FORUM_MEMBERS FM, USER_ACCOUNTS UA
      WHERE RAWTOHEX(FM.USER_ID) = RAWTOHEX(UA.USER_ID)
        AND (NVL(FM.IS_FOUNDER, 'N') = 'S' OR NVL(FM.IS_ADMIN, 'N') = 'S') 
        AND RAWTOHEX(FM.FORUM_ID) = :forum_id
    `;
  }
}
