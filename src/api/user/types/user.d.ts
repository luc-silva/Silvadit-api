interface ILessDetailedUserData {
  username: string;
  user_id: string;
}

interface ICompleteUser {
  first_name: string;
  last_name: string;
  password: string;
  country: string;
  state: string;
  email: string;
  userId: string;
  username: string;
}

interface IUserDetailsRaw {
  first_name: string;
  username: string;
  last_name: string;
  country: string;
  state: string;
  email: string;
  date_created: Date;
  id: string;
  is_banned: IYesNo;
  followers_total: number;
  following_total: number;
}

interface IUserDetailsOutput {
  firstName: string;
  username: string;
  lastName: string;
  country: string;
  state: string;
  email: string;
  dateCreated: Date;
  id: string;
  isBanned: IYesNo;
  followersTotal: number;
  followingTotal: number;
}

interface IUserData {
  user: {
    firstName: string;
    username: string;
    lastName: string;
    country: string;
    state: string;
    email: string;
    dateCreated: Date;
    id: string;
    isBanned: IYesNo;
    followersTotal: number;
    followingTotal: number;
  };
  images?: {
    profile: string;
    banner: string;
  };
}

type UserID = Branded<string, 'userId'>;

type ValidatedUserEmail = Branded<string, 'email'>;

interface IUserActivity {
  type: 'FOLLOW' | 'REACT'; //criar enum
  title: null;
  content: null;
  postId: null;
  forumId: string;
  followedUser: string;
  dateCreated: Date;
  isNsfw: 'S' | 'N';
}

interface IPostActivity {
  type: 'POST' | 'RESHARE';
  title: string;
  content: string;
  postId: string;
  forumId: string | null;
  followedUser: null;
  dateCreated: Date;
  isNsfw: 'S' | 'N';
}

interface IFollower {
  userId: string;
  dateCreated: Date;
  total: number;
}

type IActivity = IUserActivity | IPostActivity;

type ISubscribedUser = IFollower & IUserDetailsRaw;
