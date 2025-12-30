interface ICreateForumParams {
  name: string;
  description: string;
  is_nsfw: IYesNo;
  is_private: IYesNo;
  id: any;
}

interface ICreateForumReturn {
  id: string;
}

interface IUpdateForumParams {
  name: string;
  description: string;
}

interface IFollowForumParams {
  user_id: UserID;
  forum_id: ForumID;
  is_admin: IYesNo;
  is_founder: IYesNo;
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

interface IForumDetailsParams {
  forum_id: string;
  user_id: string | null;
}

interface IGetForumStaffParams {
  forum_id: string;
}
