import zod from 'zod';
import { CreatePostDTO } from '../types/post.dto';
import { CreatePostCommentaryDTO } from '~/api/commentary/types/commentary.dto';

const createPostSchema = zod.object({
  isNsfw: zod.string(),
  title: zod.string().max(100),
  content: zod.string().max(500),
  tags: zod.array(zod.string()).optional(),
});

const createPostCommentarySchema = zod.object({
  content: zod.string(),
  replyId: zod.string().optional(),
  postId: zod.string(),
});

export class PostValidator {
  static createPost(data: CreatePostDTO) {
    const result = createPostSchema.safeParse(data);

    if (!result.success) {
      console.log(zod.treeifyError(result.error));
      throw new Error('Invalid data.');
    }
  }

  static createPostCommentary(data: CreatePostCommentaryDTO) {
    const result = createPostCommentarySchema.safeParse(data);

    if (!result.success) {
      console.log(zod.treeifyError(result.error));
      throw new Error('Invalid data.');
    }
  }
}
