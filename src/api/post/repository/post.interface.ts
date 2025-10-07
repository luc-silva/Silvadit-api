interface ICreatePostParams {
  user_id: string;
  content: string;
  title: string;
  forum_id?: string | null;
  is_nsfw: 'S' | 'N';
}

interface IReactPostParams {
  post_id: string;
  user_id: string;
  date_created: Date;
  is_upvote: 'S' | 'N';
}

interface IUpdatePostParams {
  content: string;
  is_nsfw: 'S' | 'N';
  post_id: string;
  title: string;
}

interface IDeletePostParams {
  post_id: string;
}

interface IBookmarkPostParams {
  post_id: string;
  user_id: string;
  date_created: string;
}

interface IUnbookmarkPostParams {
  post_id: string;
  user_id: string;
}
