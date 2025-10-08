import { CreateForumDataDTO } from '~/api/forum/types/forum.dto';

export const createForumOutput = (data?: Partial<IForumRaw>): IForumRaw => {
  return {
    banned: 'N',
    dateCreated: new Date(),
    dateEdited: new Date(),
    description: 'lorem lorem',
    forumId: '123',
    name: 'Teste',
    followersTotal: 30,
    postsTotal: 30,
    ...data,
  };
};

export const createForum = (data?: Partial<IForumRaw>): IForumRaw => {
  return {
    banned: 'S',
    dateCreated: new Date(),
    dateEdited: new Date(),
    description: 'Lorem',
    forumId: '123',
    name: 'testeee',
    followersTotal: 30,
    postsTotal: 30,
    ...data,
  };
};

export const createForumCreateDto = (
  data?: Partial<CreateForumDataDTO>,
): CreateForumDataDTO => {
  return {
    description: 'Lorem lorem lorem',
    name: 'testeee',
    isNsfw: false,
    isPrivate: true,
    tags: [],
    ...data,
  };
};

export const createForumCreateParams = (
  data?: Partial<ICreateForumParams>,
): ICreateForumParams => {
  return {
    description: 'Lorem lorem lorem',
    is_nsfw: 'N',
    is_private: 'S',
    name: 'testeee',
    ...data,
  };
};
