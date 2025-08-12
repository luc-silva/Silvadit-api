export const POST_REPOSITORY_TOKEN = 'POST_REPOSITORY_TOKEN';

export interface PostRepositoryBase {
  createPost(data: ICreatePostParams): Promise<void>;
  deletePost(postId: PostID): Promise<void>;
  updatePost(data: IUpdatePostParams): Promise<void>;
  reactPost(data: IReactPostParams): Promise<void>;
  getTrendingPosts(): Promise<IPost[]>;
  getPosts(userId: UserID): Promise<IPost[]>;
  getPostsFromSuggested(): Promise<IPost[]>;
  getPostDetails(postId: PostID): Promise<IPost| null>;
  bookmarkPost(data: IBookmarkPostParams): Promise<void>;
  unbookmarkPost(binds: IUnbookmarkPostParams): Promise<void>;
}
