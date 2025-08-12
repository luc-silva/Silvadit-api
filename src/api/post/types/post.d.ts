interface IGetPostDetails {
  post_id: string;
}

type PostID = Branded<string, 'postId'>;

interface IPost {
  postId: string;
  userId: string;
  forumId?: string;
  content: string;
  title: string;
  isNsfw: boolean;
  dateCreated: Date;
  dateEdited: Date;
}

interface IPostOutput {
  postId: string;
  owner: {
    userId: string;
    username: string;
  };
  forum: {
    title: string;
  } | null;
  content: string;
  title: string;
  isNsfw: boolean;
  dateCreated: Date;
  dateEdited: Date | null;
}
