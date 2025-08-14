type CommentaryID = Branded<string, 'commentaryId'>;

interface ICommentaryRaw {
  id: string;
  post_id: string;
  post_title: string;
  user_id: string;
  user_username: string;
  content;
  replyId;
  dateCreated;
  dateEdited;
}
interface ICommentaryOutput {
  id: string;
  post: {
    id: string;
    title: string;
  };
  user: { id: string; username: string } | null;
  content;
  replyId;
  dateCreated;
  dateEdited;
}
