export const COMMENTARY_REPOSITORY_TOKEN = 'COMMENTARY_REPOSITORY_TOKEN';

export interface CommentaryRepositoryBase {
  getCommentariesFromPost(post_id: PostID): Promise<ICommentaryRaw[]>;

  createCommentary(body: ICreateCommentaryParams): Promise<void>;

  updateCommentary(data: IUpdateCommentaryParams): Promise<void>;

  deleteCommentary(id: CommentaryID): Promise<void>;

  reactCommentary(commentary_id: IReactCommentaryParams): Promise<void>;

  getReplies(commentary_id: CommentaryID): Promise<ICommentaryRaw[]>;

  getCommentary(commentary_id: CommentaryID): Promise<ICommentaryRaw | null>;
}
