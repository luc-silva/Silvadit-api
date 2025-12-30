import { CreateForumDataDTO } from '../types/forum.dto';
import { BIND_OUT, STRING } from 'oracledb';

export class ForumMapper {
  static createForum(data: CreateForumDataDTO): ICreateForumParams {
    return {
      description: data.description,
      is_nsfw: data.isNsfw ? 'S' : 'N',
      is_private: data.isPrivate ? 'S' : 'N',
      name: data.name,
      id: { type: STRING, dir: BIND_OUT },
    };
  }

  static toForumDetailsParams(
    user: ICompleteUser | null,
    forum_id: string,
  ): IForumDetailsParams {
    return { forum_id, user_id: user ? user.userId : null };
  }

  static toForumOutput(data: IForumRaw): IForumOutput {
    return {
      dateCreated: data.date_created,
      dateEdited: data.date_edited,
      description: data.description,
      followersTotal: data.followers_total,
      id: data.forum_id,
      name: data.name,
      postsTotal: data.posts_total,
      isFollowing: data.is_following === 'S',
      isBanned: data.is_banned === 'S',
      isNsfw: data.is_following === 'S',
      isPrivate: data.is_following === 'S',
    };
  }
}
