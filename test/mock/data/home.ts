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
    dateCreated: new Date("2025-08-12T20:15:44.438Z"),
    dateEdited: null,
    forum: null,
    isNsfw: false,
    owner: {
      userId: 'ABC',
      username: 'ABCDEF',
    },
    postId: '123ABC',
    title: 'Lorem Title',
    ...data,
  };
};

export const createRawFeedItem = (data?: IRawFeed): IRawFeed => {
  return {
    content: 'Teste',
    dateCreated: new Date("2025-08-12T20:15:44.438Z"),
    lastEdited: null,
    forum_title: null,
    forumId: null,
    isNsfw: 'N',
    owner_id: 'ABC',
    owner_username: 'ABCDEF',
    postId: '123ABC',
    title: 'Lorem Title',
    ...data,
  };
};
