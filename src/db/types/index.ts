import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

// Common Types
type Raw16 = Buffer;
type YesNo = 'S' | 'N';

// USER_ACCOUNTS
export interface UserAccountsTable {
  USER_ID: Raw16;
  FIRST_NAME: string | null;
  LAST_NAME: string | null;
  USERNAME: string;
  USER_PASSWORD: string;
  COUNTRY: string | null;
  CITY: string | null;
  EMAIL: string;
  IS_SITE_ADMIN: YesNo;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
}

export type UserAccounts = Selectable<UserAccountsTable>;
export type NewUserAccounts = Insertable<UserAccountsTable>;
export type UserAccountsUpdate = Updateable<UserAccountsTable>;

// USER_REGISTRATIONS
export interface UserRegistrationsTable {
  USER_PASSWORD: string;
  EMAIL: string;
  USERNAME: string | null;
  FIRST_NAME: string | null;
  LAST_NAME: string | null;
  COUNTRY: string | null;
  CITY: string | null;
  IS_SITE_ADMIN: YesNo | null;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
}

export type UserRegistrations = Selectable<UserRegistrationsTable>;
export type NewUserRegistrations = Insertable<UserRegistrationsTable>;
export type UserRegistrationsUpdate = Updateable<UserRegistrationsTable>;

// USER_FOLLOWERS
export interface UserFollowersTable {
  USER_ID: Raw16;
  FOLLOWING_USER: Raw16;
  DATE_CREATED: Date;
}

export type UserFollowers = Selectable<UserFollowersTable>;
export type NewUserFollowers = Insertable<UserFollowersTable>;
export type UserFollowersUpdate = Updateable<UserFollowersTable>;

// TAGS
export interface TagsTable {
  TITLE: string;
  DATE_CREATED: Date;
  IS_NSFW: YesNo | null;
}

export type Tags = Selectable<TagsTable>;
export type NewTags = Insertable<TagsTable>;
export type TagsUpdate = Updateable<TagsTable>;

// FORUMS
export interface ForumsTable {
  FORUM_ID: Raw16;
  NAME: string;
  DESCRIPTION: string | null;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
  IS_BANNED: YesNo | null;
}

export type Forums = Selectable<ForumsTable>;
export type NewForums = Insertable<ForumsTable>;
export type ForumsUpdate = Updateable<ForumsTable>;

// POSTS
export interface PostsTable {
  POST_ID: Raw16;
  USER_ID: Raw16;
  FORUM_ID: Raw16 | null;
  CONTENT: string;
  TITLE: string;
  IS_NSFW: YesNo;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
}

export type Posts = Selectable<PostsTable>;
export type NewPosts = Insertable<PostsTable>;
export type PostsUpdate = Updateable<PostsTable>;

// SAVED_POSTS
export interface SavedPostsTable {
  POST_ID: Raw16;
  USER_ID: Raw16;
  DATE_CREATED: Date;
}

export type SavedPosts = Selectable<SavedPostsTable>;
export type NewSavedPosts = Insertable<SavedPostsTable>;
export type SavedPostsUpdate = Updateable<SavedPostsTable>;

// REPORTS
export interface ReportsTable {
  FORUM_ID: Raw16;
  USER_ID: Raw16;
  REPORTER: Raw16;
  MOTIVE: string;
  DATE_CREATED: Date;
}

export type Reports = Selectable<ReportsTable>;
export type NewReports = Insertable<ReportsTable>;
export type ReportsUpdate = Updateable<ReportsTable>;

// NOTIFICATIONS
export interface NotificationsTable {
  NOTIFICATION_ID: Raw16;
  USER_ID: Raw16;
  CONTENT: string;
  IS_READ: YesNo;
  DATE_CREATED: Date;
}

export type Notifications = Selectable<NotificationsTable>;
export type NewNotifications = Insertable<NotificationsTable>;
export type NotificationsUpdate = Updateable<NotificationsTable>;

// FORUM_MEMBERS
export interface ForumMembersTable {
  FORUM_ID: Raw16;
  USER_ID: Raw16;
  IS_ADMIN: YesNo | null;
  IS_FOUNDER: YesNo | null;
  DATE_CREATED: Date;
}

export type ForumMembers = Selectable<ForumMembersTable>;
export type NewForumMembers = Insertable<ForumMembersTable>;
export type ForumMembersUpdate = Updateable<ForumMembersTable>;

// DIRECT_MESSAGES
export interface DirectMessagesTable {
  MESSAGE_ID: Raw16;
  USER_ID: Raw16;
  TARGET_USER: Raw16;
  MESSAGE_CONTENT: string;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
}

export type DirectMessages = Selectable<DirectMessagesTable>;
export type NewDirectMessages = Insertable<DirectMessagesTable>;
export type DirectMessagesUpdate = Updateable<DirectMessagesTable>;

// COMMENTARIES
export interface CommentariesTable {
  COMMENT_ID: Raw16;
  POST_ID: Raw16;
  USER_ID: Raw16;
  CONTENT: string;
  REPLY_ID: Raw16 | null;
  DATE_CREATED: Date;
  DATE_EDITED: Date | null;
}

export type Commentaries = Selectable<CommentariesTable>;
export type NewCommentaries = Insertable<CommentariesTable>;
export type CommentariesUpdate = Updateable<CommentariesTable>;

// BANNED_USERS
export interface BannedUsersTable {
  USER_ID: Raw16;
  MOTIVE: string | null;
  BAN_TYPE: string;
  BAN_EXPIRATION_DATE: Date | null;
  IS_ACTIVE: YesNo;
  DATE_CREATED: Date;
  DATE_EDITED: Date;
}

export type BannedUsers = Selectable<BannedUsersTable>;
export type NewBannedUsers = Insertable<BannedUsersTable>;
export type BannedUsersUpdate = Updateable<BannedUsersTable>;

// REACTIONS
export interface ReactionsTable {
  USER_ID: Raw16;
  DATE_CREATED: Date;
  IS_UPVOTE: YesNo;
  COMMENT_ID: Raw16 | null;
  POST_ID: Raw16 | null;
}

export type Reactions = Selectable<ReactionsTable>;
export type NewReactions = Insertable<ReactionsTable>;
export type ReactionsUpdate = Updateable<ReactionsTable>;

// Database Interface
export interface Database {
  USER_ACCOUNTS: UserAccountsTable;
  USER_REGISTRATIONS: UserRegistrationsTable;
  USER_FOLLOWERS: UserFollowersTable;
  TAGS: TagsTable;
  FORUMS: ForumsTable;
  POSTS: PostsTable;
  SAVED_POSTS: SavedPostsTable;
  REPORTS: ReportsTable;
  NOTIFICATIONS: NotificationsTable;
  FORUM_MEMBERS: ForumMembersTable;
  DIRECT_MESSAGES: DirectMessagesTable;
  COMMENTARIES: CommentariesTable;
  BANNED_USERS: BannedUsersTable;
  REACTIONS: ReactionsTable;
}
