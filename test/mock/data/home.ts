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
