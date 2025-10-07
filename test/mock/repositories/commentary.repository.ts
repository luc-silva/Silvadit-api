import { CommentaryRepositoryBase } from '~/api/commentary/repository/commentary.repository.base';

export class MockCommentaryRepository
  implements jest.Mocked<CommentaryRepositoryBase>
{
  getCommentariesFromPost = jest.fn<Promise<ICommentaryRaw[]>, [PostID]>();

  getCommentary = jest.fn<Promise<ICommentaryRaw | null>, [CommentaryID]>();

  getReplies = jest.fn<Promise<ICommentaryRaw[]>, [CommentaryID]>();

  createCommentary = jest.fn<Promise<void>, [ICreateCommentaryParams]>();

  updateCommentary = jest.fn<Promise<void>, [IUpdateCommentaryParams]>();

  deleteCommentary = jest.fn<Promise<void>, [CommentaryID]>();

  reactCommentary = jest.fn<Promise<void>, [IReactCommentaryParams]>();
}
