interface ICreateForumData {
  name: string;
  description: string;
  forum_id: string;
  date_created: Date;
}

interface IUpdateForumData {
  name: string;
  description: string;
}

interface IFollowForumData {
  forum_id: string;
  user_id: string;
  is_admin: 'S' | 'N';
  is_founder: 'S' | 'N';
  date_created: Date;
}

interface IUnfollowForumData {
  forum_id: string;
  user_id: string;
}

interface IBanUser {
  user_id: string;
  forum_id: string;
}
