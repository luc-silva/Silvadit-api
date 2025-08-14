import { CreatePostCommentaryDTO } from '~/api/commentary/types/commentary.dto';

export const createRawCommentaryMock = (
  data?: ICommentaryRaw,
): ICommentaryRaw => {
  return {
    content: 'Lorem Teste',
    dateCreated: new Date(),
    dateEdited: new Date(),
    id: 'ABC',
    post_id: 'POST23',
    post_title: 'Lorem Post Commentary Mock',
    replyId: 'COMMENT',
    user_id: 'USER123',
    user_username: 'USER',
    ...data,
  };
};

export const createCommentaryOutputMock = (
  data?: Partial<ICommentaryOutput>,
): ICommentaryOutput => {
  return {
    content: 'Lorem Teste',
    dateCreated: new Date(),
    dateEdited: new Date(),
    id: 'ABC',
    post: { id: 'POST23', title: 'Lorem Post Commentary Mock' },
    replyId: 'COMMENT',
    user: { id: 'USER123', username: 'USER' },
    ...data,
  };
};

export const createCommentaryParamsMock = (
  data?: Partial<ICreateCommentaryParams>,
): ICreateCommentaryParams => {
  return {
    content: 'Lorem Lorem Lorem',
    postId: 'LOREMAVB',
    userId: 'USER123',
    replyId: 'REPLY123',
    ...data,
  };
};

export const createPostCommentaryDTO = (
  data?: Partial<CreatePostCommentaryDTO>,
): CreatePostCommentaryDTO => {
  return {
    content: 'Lorem Lorem Lorem',
    postId: 'LOREMAVB',
    replyId: "REPLY123",
    ...data,
  };
};
