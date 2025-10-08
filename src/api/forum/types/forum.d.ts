type ForumID = Branded<string, string>;

interface IForumRaw {
  forumId: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited: Date;
  banned: 'S' | 'N';
  followersTotal: number;
  postsTotal: number;
}

interface IForumMember {
  isAdmin: 'S' | 'N';
  isFounder: 'S' | 'N';
  dateSubscribed;
}

type ISubscribedForum = Omit<IForumRaw, 'dateEdited'> & IForumMember;
