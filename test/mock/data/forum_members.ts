export const createSubscribedForumRawData = (
  data?: Partial<ISubscribedForumRaw>,
): ISubscribedForumRaw => {
  return {
    forum_description: 'Lorem',
    forum_followers: 12,
    forum_id: 'ABC123',
    forum_is_banned: 'N',
    forum_name: 'Teste',
    is_admin: 'N',
    is_founder: 'N',
    member_since: new Date('2025-08-12T20:15:44.438Z'),
    ...data,
  };
};

export const createSubscribedForumOutputData = (
  data?: Partial<ISubscribedForumOutput>,
): ISubscribedForumOutput => {
  return {
    forum: {
      description: 'Lorem',
      followers: 12,
      id: 'ABC123',
      isBanned: false,
      name: 'Teste',
    },
    isAdmin: false,
    isFounder: false,
    memberSince: new Date('2025-08-12T20:15:44.438Z'),
    ...data,
  };
};
