export class ForumMembersMapper {
  static subscribedForum(data: ISubscribedForumRaw): ISubscribedForumOutput {
    return {
      forum: {
        description: data.forum_description,
        followers: data.forum_followers,
        id: data.forum_id,
        isBanned: data.forum_is_banned === 'S',
        name: data.forum_name,
      },
      isAdmin: data.is_admin === 'S',
      isFounder: data.is_founder === 'S',
      memberSince: data.member_since,
    };
  }
}
