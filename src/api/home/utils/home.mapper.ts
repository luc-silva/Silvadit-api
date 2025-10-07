import { CreatePostDTO } from '~/api/post/types/post.dto';

export class HomepageMapper {
  static createPost(
    data: CreatePostDTO,
    user: ICompleteUser,
  ): ICreatePostParams {
    return {
      content: data.content,
      title: data.title,
      user_id: user.userId,
      forum_id: data.forumId ? data.forumId : null,
      is_nsfw: data.isNsfw == 'true' ? 'S' : 'N',
    };
  }

  static mapRawFeed(raw: IRawFeed[]): IFeedOutput[] {
    return raw.map((data) => ({
      content: data.content,
      dateCreated: data.dateCreated,
      dateEdited: data.lastEdited,
      forum: data.forumId ? { name: data.forum_title, id: data.forumId, description: data } : null,
      isNsfw: data.isNsfw === 'S' ? true : false,
      owner: {
        id: data.owner_id,
        username: data.owner_username,
      },
      postId: data.postId,
      title: data.title,
    }));
  }
}
