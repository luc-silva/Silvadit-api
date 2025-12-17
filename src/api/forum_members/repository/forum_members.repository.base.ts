export const FORUM_MEMBERS_REPOSITORY_TOKEN = 'FORUM_MEMBERS_REPOSITORY_TOKEN';

export interface ForumMembersRepositoryBase {

  getForumsFromUser(userId: UserID): Promise<ISubscribedForumRaw[]>
}