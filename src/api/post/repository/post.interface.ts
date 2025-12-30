interface ICreatePostParams {
  user_id: string;
  content: string;
  title: string;
  forum_id?: string | null;
  is_nsfw: IYesNo;
}

interface IReactPostParams {
  post_id: string;
  user_id: string;
  date_created: Date;
  is_upvote: IYesNo;
}

interface IUpdatePostParams {
  content: string;
  is_nsfw: IYesNo;
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

interface IGetPostUnmappedFilter {
  isNsfw?: IYesNo;
  user?: ICompleteUser | null;
  forumId?: string;
  postId?: string;
  page?: number;
  itemPerPage?: number;
}

interface IGetPostsParams {
  post_id: string;
  user_id: string;
  forum_id: string;
  nsfw: IYesNo;
  page: number;
  items_per_page: number;
  //tags: string[];
}

type IGetPostsFilter = Partial<IGetPostsParams>;
