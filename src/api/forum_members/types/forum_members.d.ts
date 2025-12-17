interface ISubscribedForumRaw {
  is_admin: 'S' | 'N';
  is_founder: 'S' | 'N';
  member_since: Date;
  forum_id: string;
  forum_name: string;
  forum_followers: number;
  forum_description: string;
  forum_is_banned: 'S' | 'N';
}

interface ISubscribedForumOutput {
  isAdmin: boolean;
  isFounder: boolean;
  memberSince: Date;
  forum: {
    id: string;
    name: string;
    followers: number;
    description: string;
    isBanned: boolean;
  };
}
