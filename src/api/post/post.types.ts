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
}
