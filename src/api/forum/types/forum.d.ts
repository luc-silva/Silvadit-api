type ForumID = Branded<string, string>;

interface IForum {
  forumId: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited: Date;
  banned: 'S' | 'N';
}

interface IForumMember {
  isAdmin: 'S' | 'N';
  isFounder: 'S' | 'N';
  dateSubscribed;
}

type ISubscribedForum = Omit<IForum, 'dateEdited'> & IForumMember;

interface IForumOutput {
  forumId: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited: Date;
  banned: boolean;
}
