import { GetForumMemberFilterDTO } from '~/api/forum/types/forum.dto';

export class ForumMembersMapper {
  static subscribedForum(data: ISubscribedForumRaw): ISubscribedForumOutput {
    return {
      forum: {
        description: data.forum_description,
        followers: data.forum_followers,
        id: data.forum_id,
        isBanned: data.forum_is_banned === 'S',
        name: data.forum_name,
      },
      isAdmin: data.is_admin === 'S',
      isFounder: data.is_founder === 'S',
      memberSince: data.member_since,
    };
  }

  static toUnsubscribeParams(
    user_id: string,
    forum_id: string,
  ): IUnsubscribeUserParams {
    return { user_id, forum_id };
  }

  static toSubscribeParams(
    user_id: string,
    forum_id: string,
    is_admin: boolean,
    is_founder: boolean,
  ): ISubscribeUserParams {
    return {
      user_id,
      forum_id,
      is_admin: is_admin ? 'S' : 'N',
      is_founder: is_founder ? 'S' : 'N',
    };
  }

  static toForumMembersOutput(data: IForumMemberRaw): IForumMemberOutput {
    return {
      country: data.country,
      dateCreated: data.date_created,
      firstName: data.first_name,
      id: data.id,
      lastName: data.last_name,
      state: data.state,
      username: data.username,
    };
  }

  //TODO: Change Nest DTO validation with Zod
  //reason: there's a bug on the class validation which even setting exposeDefaultValues  as false, we stil get undefined in the optional properties
  static toGetForumMembersParams(
    data: GetForumMemberFilterDTO,
  ): IGetForumMembersParams {
    return {
      forum_id: data.forumId,
      ...(data.isAdmin && { is_admin: data.isAdmin }),
      ...(data.search && { search: data.search }),
      items_per_page: Number(data.itemsPerPage),
      page: Number(data.page),
    };
  }
}
