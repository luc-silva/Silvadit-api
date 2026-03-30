import { GetPostsDTO, UpdatePostDTO } from '../types/post.dto';

export class PostMapper {
  static mapPostDetails(data: IPostRaw): IPostOutput {
    return {
      post: {
        content: data.post_content,
        dateCreated: data.post_date_created,
        dateEdited: data.post_date_edited,
        id: data.post_id,
        isNsfw: data.post_is_nsfw,
        title: data.post_title,
        comentaries: data.post_comentaries,
        likes: data.post_likes,
      },
      forum: data.forum_id
        ? {
            id: data.forum_id!,
            name: data.forum_name!,
            description: data.forum_description!,
          }
        : null,
      owner: {
        id: data.owner_id,
        username: data.owner_username,
      },
    };
  }

  static updatePost(data: UpdatePostDTO): IUpdatePostParams {
    return {
      content: data.content,
      title: data.title,
      is_nsfw: data.isNsfw ? 'S' : 'N',
      post_id: data.postId,
    };
  }

  static toGetPosts(data: GetPostsDTO): IGetPostsParams {
    return {
      ...(!!data.forumId && { forum_id: data.forumId }),
      ...(!!data.postId && { post_id: data.postId }),
      ...(!!data.fromUser && { user_id: data.fromUser }),
      ...(!!data.userId && { from_user_id: data.userId }),
      ...(!!data.tags && data.tags.length && { tags: data.tags }),
      nsfw: !data.isNsfw ? "N" : data.isNsfw,
      page: Number(data.page),
      items_per_page: Number(data.itemsPerPage),
    };
  }
}
