import { PostRepositoryBase } from "~/api/post/repository/post.repository.base";

export class MockPostRepository implements jest.Mocked<PostRepositoryBase> {
  createPost = jest.fn<Promise<void>, [ICreatePostParams]>();

  deletePost = jest.fn<Promise<void>, [PostID]>();

  updatePost = jest.fn<Promise<void>, [IUpdatePostParams]>();

  reactPost = jest.fn<Promise<void>, [IReactPostParams]>();

  getTrendingPosts = jest.fn<Promise<IPostRaw[]>, []>();

  getPosts = jest.fn<Promise<IPostRaw[]>, [IGetPostsParams]>();

  getPostsFromSuggested = jest.fn<Promise<IPostRaw[]>, []>();

  getPostDetails = jest.fn<Promise<IPostRaw | null>, [PostID]>();

  bookmarkPost = jest.fn<Promise<void>, [IBookmarkPostParams]>();
  
  unbookmarkPost = jest.fn<Promise<void>, [IUnbookmarkPostParams]>();
}
