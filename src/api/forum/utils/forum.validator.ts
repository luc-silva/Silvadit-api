import { CreateForumDataDTO } from '../types/forum.dto';
import zod from 'zod';

const createForumSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  isNsfw: zod.boolean(),
  isPrivate: zod.boolean(),
});

export class ForumValidator {
  static createForum(data: CreateForumDataDTO) {
    const result = createForumSchema.safeParse(data);

    if (!result.success) {
      throw new Error('Invalid data.');
    }
  }
}
