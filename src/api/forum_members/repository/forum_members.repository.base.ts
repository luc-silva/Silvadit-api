export const FORUM_MEMBERS_REPOSITORY_TOKEN = 'FORUM_MEMBERS_REPOSITORY_TOKEN';

export interface ForumMembersRepositoryBase {
  getForumsFromUser(userId: UserID): Promise<ISubscribedForumRaw[]>;

  checkIfUserSubscribed(
    userId: UserID,
    forumId: ForumID,
  ): Promise<number | null>;

  subscribeUser(params: ISubscribeUserParams): Promise<void>;

  unsubscribeUser(params: IUnsubscribeUserParams): Promise<void>;

  getForumMembers(params: IGetForumMembersParams, order: IGetForumMembersOrder): Promise<IForumMemberRaw[]>

  getForumStaff(params: IGetForumStaffParams): Promise<IForumMemberRaw[]>
}
