type ForumID = Branded<string, string>;

interface IForumRaw {
  forum_id: string;
  name: string;
  description: string;
  date_created: Date;
  date_edited: Date;
  followers_total: number;
  posts_total: number;
  is_following: IYesNo;
  is_banned: IYesNo;
  is_private: IYesNo;
  is_nsfw: IYesNo;
}

interface IForumOutput {
  id: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited: Date;
  isBanned: boolean;
  followersTotal: number;
  postsTotal: number;
  isFollowing: boolean;
  isNsfw: boolean;
  isPrivate: boolean;
}

interface IForum {
  forum: IForumOutput;
  staff: IForumMemberOutput[];
  images?: {
    profile: string;
    banner: string;
  };
}
