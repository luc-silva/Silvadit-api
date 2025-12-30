import { BIND_OUT, STRING } from 'oracledb';
import {
  CreateForumDataDTO,
  GetForumMemberFilterDTO,
} from '~/api/forum/types/forum.dto';

export const createForumOutput = (
  data?: Partial<IForumOutput>,
): IForumOutput => {
  return {
    isBanned: false,
    dateCreated: new Date('2025-12-20T02:22:22.270Z'),
    dateEdited: new Date('2025-12-20T02:22:22.270Z'),
    description: 'lorem lorem',
    id: '123',
    name: 'Teste',
    followersTotal: 30,
    postsTotal: 30,
    isFollowing: false,
    isNsfw: false,
    isPrivate: false,
    ...data,
  };
};

export const createForumRaw = (data?: Partial<IForumRaw>): IForumRaw => {
  return {
    date_created: new Date('2025-12-20T02:22:22.270Z'),
    date_edited: new Date('2025-12-20T02:22:22.270Z'),
    description: 'Lorem',
    forum_id: '123',
    name: 'testeee',
    followers_total: 30,
    posts_total: 30,
    is_banned: 'S',
    is_following: 'N',
    is_nsfw: 'N',
    is_private: 'N',
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

export const createForumDetailsParams = (
  data?: Partial<IForumDetailsParams>,
): IForumDetailsParams => {
  return {
    forum_id: 'ABC',
    user_id: 'ABC123',
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
    id: { type: STRING, dir: BIND_OUT },
    ...data,
  };
};

export const createUnsubscribeParams = (
  data?: Partial<IUnsubscribeUserParams>,
): IUnsubscribeUserParams => {
  return {
    forum_id: 'ABC',
    user_id: 'ABC123',
    ...data,
  };
};

export const createSubscribeParams = (
  data?: Partial<ISubscribeUserParams>,
): ISubscribeUserParams => {
  return {
    forum_id: 'ABC',
    user_id: 'ABC123',
    is_admin: 'N',
    is_founder: 'N',
    ...data,
  };
};

export const createGetForumMemberFilterDTO = (
  data?: Partial<GetForumMemberFilterDTO>,
): GetForumMemberFilterDTO => {
  return {
    forumId: 'ABC',
    isAdmin: 'N',
    search: 'A',
    itemsPerPage: '10',
    page: '1',
    ...data,
  };
};

export const createGetForumMembersParams = (
  data?: Partial<IGetForumMembersParams>,
): IGetForumMembersParams => {
  return {
    forum_id: 'ABC',
    is_admin: 'N',
    search: 'A',
    items_per_page: 10,
    page: 1,
    ...data,
  };
};

export const createForumMembersRaw = (
  data?: Partial<IForumMemberRaw>,
): IForumMemberRaw => {
  return {
    country: 'Brazil',
    date_created: new Date('2025-12-20T02:22:22.270Z'),
    first_name: 'Joe',
    id: 'ABC',
    last_name: 'Doe',
    state: 'Sao Paulo',
    username: 'John',
    ...data,
  };
};

export const createForumMembersOutput = (
  data?: Partial<IForumMemberOutput>,
): IForumMemberOutput => {
  return {
    country: 'Brazil',
    dateCreated: new Date('2025-12-20T02:22:22.270Z'),
    firstName: 'Joe',
    id: 'ABC',
    lastName: 'Doe',
    state: 'Sao Paulo',
    username: 'John',
    ...data,
  };
};

export const createForum = (data?: Partial<IForum>): IForum => {
  return {
    forum: createForumOutput(),
    staff: [createForumMembersOutput()],
    ...data,
  };
};
