interface ICreateForumParams {
  name: string;
  description: string;
  forum_id: ForumID;
  date_created: Date;
}

interface IUpdateForumParams {
  name: string;
  description: string;
}

interface IFollowForumParams {
  user_id: UserID;
  forum_id: ForumID;
  is_admin: 'S' | 'N';
  is_founder: 'S' | 'N';
  date_created: Date;
}

interface IUnfollowForumParams {
  user_id: UserID;
  forum_id: ForumID;
}

interface IBanUserParams {
  user_id: UserID;
  forum_id: ForumID;
}
