interface ICreateComentary {
  user_id: string;
  post_id: string;
  content: string;
  reply_id?: string;
}

interface IReactCommentaryData {
  post_id: string;
  user_id: string;
  commentary_id: string;
  date_created: Date;
  is_upvote: 'S' | 'N';
}
