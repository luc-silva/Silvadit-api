import { CreatePostDTO } from '~/api/post/types/post.dto';

export const createPostDTO = (data?: Partial<CreatePostDTO>): CreatePostDTO => {
  return {
    content: 'Lorem lorem content',
    isNsfw: 'false',
    title: 'Lorem Title',
    forumId: 'Lorem Forum',
    ...data,
  };
};

export const createFeedItem = (data?: IFeedOutput): IFeedOutput => {
  return {
    content: 'Teste',
    dateCreated: new Date(),
    dateEdited: null,
    forum: null,
    isNsfw: false,
    owner: {
      userId: 'ABC',
      username: 'ABCDEF',
    },
    postId: '123ABC',
    title: 'Lorem Title',
    ...data
  };
};
