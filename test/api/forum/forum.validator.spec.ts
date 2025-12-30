import { createForumCreateDto } from "test/mock/data/forum";
import { CreateForumDataDTO } from "~/api/forum/types/forum.dto";
import { ForumValidator } from "~/api/forum/utils/forum.validator";

describe('Validator', () => {
  describe('createForum', () => {
    it('Should invalidate invalidate data correctly', () => {
      expect(() => {
        ForumValidator.createForum({} as CreateForumDataDTO);
      }).toThrow('Invalid data.');
    });

    it('Should invalidate validate data correctly', () => {
      expect(() => {
        ForumValidator.createForum(createForumCreateDto());
      }).not.toThrow('Invalid data.');
    });
  });
});
