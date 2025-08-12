import { CreatePostDTO } from '~/api/post/types/post.dto';

export class HomepageMapper {
  static createPost(data: CreatePostDTO, user: ICompleteUser): ICreatePostParams {
    return {
      content: data.content,
      title: data.title,
      user_id: user.userId,
      forum_id: data.forumId ? data.forumId : null,
      is_nsfw: data.isNsfw == 'true' ? 'S' : 'N',
    };
  }
}
