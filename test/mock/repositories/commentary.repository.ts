import { CommentaryRepositoryBase } from '~/api/commentary/repository/commentary.repository.base';

export class MockCommentaryRepository
  implements jest.Mocked<CommentaryRepositoryBase>
{
  getPostCommentaries = jest.fn<Promise<ICommentary[]>, [PostID]>();

  createCommentary = jest.fn<Promise<void>, [ICreateCommentaryParams]>();

  updateCommentary = jest.fn<Promise<void>, [IUpdateCommentaryParams]>();

  deleteCommentary = jest.fn<Promise<void>, [CommentaryID]>();

  reactCommentary = jest.fn<Promise<void>, [IReactCommentaryParams]>();
}
