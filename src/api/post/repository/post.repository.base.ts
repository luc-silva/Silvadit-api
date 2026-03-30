export const POST_REPOSITORY_TOKEN = 'POST_REPOSITORY_TOKEN';

export interface PostRepositoryBase {
  createPost(data: ICreatePostParams): Promise<void>;
  deletePost(postId: PostID): Promise<void>;
  updatePost(data: IUpdatePostParams): Promise<void>;
  reactPost(data: IReactPostParams): Promise<void>;
  getTrendingPosts(): Promise<IPostRaw[]>;
  getPosts(data: IGetPostsParams): Promise<IPostRaw[]>;
  getPostsFromSuggested(): Promise<IPostRaw[]>; 
  getPostDetails(postId: PostID): Promise<IPostRaw| null>;
  bookmarkPost(data: IBookmarkPostParams): Promise<void>;
  unbookmarkPost(binds: IUnbookmarkPostParams): Promise<void>;
}
