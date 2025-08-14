import { CreatePostCommentaryDTO } from '../types/commentary.dto';

export class CommentaryMapper {
  static fromRaw(data: ICommentaryRaw[]): ICommentaryOutput[] {
    return data.map((commentary) => ({
      id: commentary.id,
      content: commentary.content,
      dateCreated: commentary.dateCreated,
      dateEdited: commentary.dateEdited,
      replyId: commentary.replyId,
      post: {
        id: commentary.post_id,
        title: commentary.post_title,
      },
      user: {
        id: commentary.user_id,
        username: commentary.user_username,
      },
    }));
  }

  static createCommentary(
    data: CreatePostCommentaryDTO,
    user: ICompleteUser,
  ): ICreateCommentaryParams {
    return {
      content: data.content,
      postId: data.postId,
      userId: user.userId,
      replyId: data.replyId ?? null,
    };
  }
}
