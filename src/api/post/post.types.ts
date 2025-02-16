interface ICreatePost {
  user_id: string;
  post_id: string;
  content: string;
  forum_id?: string;
  is_nsfw?: 'S' | 'N';
}

interface IReactPostData {
  post_id: string;
  user_id: string;
  date_created: Date;
  is_upvote: 'S' | 'N';
}

interface IUpdatePostData {
  content: string;
  is_nsfw: 'S' | 'N';
  post_id: string;
}

interface IGetPostDetails {
  post_id: string;
}

interface IDeletePostData {
  post_id: string;
}

interface IBookmarkPostData {
  post_id: string;
  user_id: string;
  date_created: string;
}

interface IUnbookmarkPostData {
  post_id: string;
  user_id: string;
}
