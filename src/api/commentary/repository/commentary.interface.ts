interface ICreateCommentaryParams {
  userId: string;
  postId: string;
  content: string;
  replyId: string | null;
}

interface IUpdateCommentaryParams {
  content: string;
}

interface IReactCommentaryParams {
  target_id: CommentaryID;
  target_type: 'post' | 'commentary';
  reaction: ReactType;
  date_created: Date;
}

enum ReactType {
  LIKE = 'like',
  DISLIKE = 'dislike',
} //as const
