import {
  CreatePostDTO,
  GetPostsDTO,
  UpdatePostDTO,
} from '~/api/post/types/post.dto';

export const createPostRaw = (data?: Partial<IPostRaw>): IPostRaw => {
  return {
    post_content: 'lorem',
    post_date_created: new Date('2025-08-12T20:15:44.438Z'),
    post_date_edited: new Date('2025-08-12T20:15:44.438Z'),
    post_is_nsfw: false,
    post_id: 'POST123',
    post_title: 'POSTITLE',
    post_comentaries: 4,
    post_likes: 3,

    forum_id: 'FORUM123',
    forum_name: 'POST',
    forum_description: 'forumdescription',

    owner_id: 'USER123',
    owner_username: 'USERUSERNAME',
    ...data,
  };
};

export const createPostOutput = (data?: Partial<IPostOutput>): IPostOutput => {
  return {
    post: {
      content: 'lorem',
      dateCreated: new Date('2025-08-12T20:15:44.438Z'),
      dateEdited: new Date('2025-08-12T20:15:44.438Z'),
      isNsfw: false,
      id: 'POST123',
      title: 'POSTITLE',
      comentaries: 4,
      likes: 3,
    },
    forum: {
      id: 'FORUM123',
      name: 'POST',
      description: 'forumdescription',
    },
    owner: {
      id: 'USER123',
      username: 'USERUSERNAME',
    },
    ...data,
  };
};

export const createPostDTO = (data?: Partial<CreatePostDTO>): CreatePostDTO => {
  return {
    content: 'Lorem lorem content',
    isNsfw: 'false',
    title: 'Lorem Title',
    forumId: 'Lorem Forum',
    ...data,
  };
};

export const createPostCreateParams = (
  data?: Partial<ICreatePostParams>,
): ICreatePostParams => {
  return {
    content: 'Lorem lorem content',
    is_nsfw: 'N',
    title: 'Lorem Title',
    forum_id: 'Lorem Forum',
    user_id: '123',
    ...data,
  };
};

export const createPostUpdateDto = (
  data?: Partial<UpdatePostDTO>,
): UpdatePostDTO => {
  return {
    content: 'Lorem is Lorem',
    isNsfw: false,
    postId: '123',
    title: 'TITULO',
    ...data,
  };
};

export const createPostUpdateParams = (
  data?: Partial<IUpdatePostParams>,
): IUpdatePostParams => {
  return {
    content: 'Lorem is Lorem',
    is_nsfw: 'N',
    post_id: '123',
    title: 'TITULO',
    ...data,
  };
};

export const createGetPostFilter = (
  data?: Partial<IGetPostsParams>,
): IGetPostsParams => {
  return {
    forum_id: 'ABC',
    nsfw: 'N',
    post_id: 'ABC123',
    from_user_id: '2131',
    items_per_page: 10,
    page: 1,
    ...data,
  };
};

//obsolete
export const createGetPostUnmappedFilter = (
  data?: IGetPostUnmappedFilter,
): IGetPostUnmappedFilter => {
  return {
    forumId: 'ABCFORUM',
    itemPerPage: 10,
    page: 1,
    postId: 'ABCA',
    user: null,
    ...data,
  };
};

export const createGetPostDTO = (data?: Partial<GetPostsDTO>): GetPostsDTO => {
  return {
    itemsPerPage: '5',
    page: '1',
    ...data,
  };
};
