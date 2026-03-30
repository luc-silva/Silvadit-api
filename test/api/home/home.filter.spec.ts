import { GetFeedDTO } from '~/api/home/types/home.dto';
import { HomeFilter } from '~/api/home/utils/home.filter';

describe('Filter', () => {
  describe('createFeedFilters', () => {
    const baseDto: GetFeedDTO = {
      page: 1,
      itemsPerPage: 10,
      isNsfw: 'N',
    };

    it('should return base filters with default values', () => {
      const dto: GetFeedDTO = { ...baseDto };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).toEqual({
        page: 1,
        items_per_page: 10,
        nsfw: 'N',
      });
    });

    it('should include forum_id when forumId is provided', () => {
      const dto: GetFeedDTO = {
        ...baseDto,
        forumId: 'forum-123',
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).toEqual({
        page: 1,
        items_per_page: 10,
        nsfw: 'N',
        forum_id: 'forum-123',
      });
    });

    it('should include from_user_id when fromUserId is provided', () => {
      const dto: GetFeedDTO = {
        ...baseDto,
        fromUserId: 'user-456',
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).toEqual({
        page: 1,
        items_per_page: 10,
        nsfw: 'N',
        from_user_id: 'user-456',
      });
    });

    it('should include both forum_id and from_user_id when both are provided', () => {
      const dto: GetFeedDTO = {
        ...baseDto,
        forumId: 'forum-123',
        fromUserId: 'user-456',
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).toEqual({
        page: 1,
        items_per_page: 10,
        nsfw: 'N',
        forum_id: 'forum-123',
        from_user_id: 'user-456',
      });
    });

    it('should preserve nsfw value when isNsfw is "S"', () => {
      const dto = {
        page: 1,
        itemsPerPage: 10,
        isNsfw: 'S' as const,
      } as GetFeedDTO;

      const result = HomeFilter.createFeedFilters(dto);

      expect(result.nsfw).toBe('S');
    });

    it('should preserve nsfw value when isNsfw is "N"', () => {
      const dto = {
        page: 1,
        itemsPerPage: 10,
        isNsfw: 'N' as const,
      } as GetFeedDTO;

      const result = HomeFilter.createFeedFilters(dto);

      expect(result.nsfw).toBe('N');
    });

    it('should handle custom page and itemsPerPage values', () => {
      const dto: GetFeedDTO = {
        page: 5,
        itemsPerPage: 25,
        isNsfw: 'N',
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).toEqual({
        page: 5,
        items_per_page: 25,
        nsfw: 'N',
      });
    });

    it('should exclude forum_id when forumId is not provided', () => {
      const dto: GetFeedDTO = {
        ...baseDto,
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).not.toHaveProperty('forum_id');
    });

    it('should exclude from_user_id when fromUserId is not provided', () => {
      const dto: GetFeedDTO = {
        ...baseDto,
      };

      const result = HomeFilter.createFeedFilters(dto);

      expect(result).not.toHaveProperty('from_user_id');
    });
  });
});
