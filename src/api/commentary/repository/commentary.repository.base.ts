export const COMMENTARY_REPOSITORY_TOKEN = 'COMMENTARY_REPOSITORY_TOKEN';

export interface CommentaryRepositoryBase {
  getPostCommentaries(post_id: PostID): Promise<ICommentary[]>;

  createCommentary(body: ICreateCommentaryParams): Promise<void>;

  updateCommentary(data: IUpdateCommentaryParams): Promise<void>;

  deleteCommentary(id: CommentaryID): Promise<void>;

  reactCommentary(commentary_id: IReactCommentaryParams): Promise<void>;
}
