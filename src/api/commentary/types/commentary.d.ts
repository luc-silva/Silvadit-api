type CommentaryID = Branded<string, 'commentaryId'>;

interface ICommentaryRaw {
  id: string;
  post_id: string;
  post_title: string;
  user_id: string;
  user_username: string;
  content: string;
  replyId: string;
  dateCreated: Date;
  dateEdited: Date;
  likes: number;
  replies_total: number;
}
interface ICommentaryOutput {
  id: string;
  post: {
    id: string;
    title: string;
  };
  user: { id: string; username: string } | null;
  content: string;
  replyId: string;
  dateCreated: Date;
  dateEdited: Date;
  likes: number;
  replies: ICommentary[];
  repliesTotal: number;
}
