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
