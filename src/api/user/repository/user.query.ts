export class UserQuery {
  public static getUserPosts() {
    return `
      SELECT 
        UA.FIRST_NAME "firstName",
        UA.LAST_NAME "lastName",
        UA.USERNAME "username",
        COUNT(*) "total",
      FROM USER_ACCOUNTS UA, POST P
      WHERE RAWTOHEX(UA.USER_ID) = :id
        AND UA.USER_ID = P.USER_ID(+)
    `;
  }

  public static getUserFollowers() {
    return `
      SELECT 
        UA.USERNAME "username",
        UF.USER_FOLLOWERS "dateCreated",
        COUNT(*) "total",
      FROM USER_ACCOUNTS UA, USER_FOLLOWERS UF
      WHERE RAWTOHEX(UA.USER_ID) = :id
        AND UF.USER_ID = UA.USER_ID(+)
        AND UF.FOLLOWING_USER = :user_id
    `;
  }

  public static getUserFollowedAccounts() {
    return `
      SELECT 
        UA.FIRST_NAME "firstName",
        UA.LAST_NAME "lastName",
        UA.USERNAME "username",
        COUNT(*) "total",
      FROM USER_ACCOUNTS UA, USER_ACCOUNTS UF
      WHERE RAWTOHEX(UA.USER_ID) = :id
        AND UF.USER_ID = UA.USER_ID(+)
        AND UF.USER_ID = :user_id
    `;
  }

  public static getUserFollowedForums() {
    return `
      SELECT 
        F.FORUM_ID "forumId",
        F.NAME "name",
        F.DESCRIPTION "description",
        F.DATE_CREATED "dateCreated",
        F.DATE_EDITED "dateEdited",
        F.BANNED "banned",
        COUNT(*) "total",
      FROM USER_ACCOUNTS UA, FORUM_MEMBERS FM, FORUM F
      WHERE RAWTOHEX(UA.USER_ID) = :id
        AND UA.USER_ID = FM.USER_ID(+)
        AND FM.USER_ID = :user_id
        AND F.FORUM_ID = FM.FORUM_ID(+)
    `;
  }

  public static createUser() {
    return `
      INSERT INTO USER_ACCOUNTS (
        FIRST_NAME,
        LAST_NAME,
        USERNAME,
        USER_PASSWORD,
        COUNTRY,
        CITY,
        EMAIL,
        DATE_CREATED,
        USER_ID
      )
      VALUES (
        :first_name,
        :last_name,
        :username,
        :user_password,
        :country,
        :city,
        :email,
        :date_created,
        :user_id
      ) 
    `;
  }

  public static checkIfEmailRegistered() {
    return `
      SELECT 1 "exist"
      FROM USER_ACCOUNTS UA
      WHERE UA.EMAIL = :email
    `;
  }

  public static getUserByEmail() {
    return `
      SELECT
        UA.FIRST_NAME,
        UA.LAST_NAME,
        UA.USERNAME,
        UA.USER_PASSWORD,
        UA.COUNTRY,
        UA.CITY,
        UA.EMAIL,
        --UA.DESCRIPTION,
        UA.DATE_CREATED,
        RAWTOHEX(UA.USER_ID)
      FROM USER_ACCOUNTS UA
      WHERE UA.EMAIL = :email
    `;
  }

  public static getUserByIdOrUsername() {
    return `
      SELECT
        UA.FIRST_NAME "firstName",
        UA.LAST_NAME "lastName",
        UA.USERNAME "username",
        UA.COUNTRY "country",
        UA.CITY "city",
        UA.EMAIL "email",
        UA.DATE_CREATED "dateCreated",
        --UA.DESCRIPTION "description",
        RAWTOHEX(UA.USER_ID) "userId"
      FROM USER_ACCOUNTS UA
      WHERE (RAWTOHEX(UA.USER_ID) = :login OR UA.USERNAME = :login)
    `;
  }

    public static getUserByLoginMethod() {
    return `
      SELECT
        UA.FIRST_NAME "firstName",
        UA.LAST_NAME "lastName",
        UA.USERNAME "username",
        UA.COUNTRY "country",
        UA.CITY "city",
        UA.EMAIL "email",
        UA.DATE_CREATED "dateCreated",
        --UA.DESCRIPTION "description",
        UA.USER_PASSWORD "password",
        RAWTOHEX(UA.USER_ID) "userId"
      FROM USER_ACCOUNTS UA
      WHERE (UA.EMAIL = :login OR UA.USERNAME = :login)
    `;
  }
}
