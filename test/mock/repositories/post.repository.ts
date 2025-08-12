import { PostRepositoryBase } from "~/api/post/repository/post.repository.base";

export class MockPostRepository implements jest.Mocked<PostRepositoryBase> {
  createPost = jest.fn<Promise<void>, [ICreatePostParams]>();

  deletePost = jest.fn<Promise<void>, [PostID]>();

  updatePost = jest.fn<Promise<void>, [IUpdatePostParams]>();

  reactPost = jest.fn<Promise<void>, [IReactPostParams]>();

  getTrendingPosts = jest.fn<Promise<IPost[]>, []>();

  getPosts = jest.fn<Promise<IPost[]>, [UserID]>();

  getPostsFromSuggested = jest.fn<Promise<IPost[]>, []>();

  getPostDetails = jest.fn<Promise<IPost | null>, [PostID]>();

  bookmarkPost = jest.fn<Promise<void>, [IBookmarkPostParams]>();
  
  unbookmarkPost = jest.fn<Promise<void>, [IUnbookmarkPostParams]>();
}
