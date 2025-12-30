import {
  createGetPostFilter,
  createGetPostUnmappedFilter,
  createPostOutput,
  createPostRaw,
  createPostUpdateDto,
  createPostUpdateParams,
} from 'test/mock/data/post';
import { createCompletedUserData } from 'test/mock/data/user';
import { PostMapper } from '~/api/post/utils/post.mapper';

describe('Mapper', () => {
  describe('mapPostDetails', () => {
    it('Should map correctly', () => {
      const rawMock = createPostRaw();
      const result = PostMapper.mapPostDetails(rawMock);
      const expected = createPostOutput();

      expect(result).toEqual(expected);
    });
  });

  describe('updatePost', () => {
    it('Should map correctly', () => {
      const rawMock = createPostUpdateDto();
      const result = PostMapper.updatePost(rawMock);
      const expected = createPostUpdateParams();

      expect(result).toEqual(expected);
    });
  });

  describe('getPosts', () => {
    it('Should map correctly', () => {
      const forumIdMock = 'ABC';
      const expected: IGetPostsFilter = {
        forum_id: forumIdMock,
        user_id: 'ABCEDFGE',
        page: 1,
        items_per_page: 10,
      };
      const mockedUser = createCompletedUserData({ userId: 'ABCEDFGE' });

      const filter = createGetPostUnmappedFilter({
        user: mockedUser,
        postId: undefined,
        forumId: forumIdMock,
      });

      const result = PostMapper.toGetPosts(filter);

      expect(result).toEqual(expected);
    });

    it('Should map correctly if params not specified', () => {
      const expected: IGetPostsFilter = {
        items_per_page: 10,
        page: 1,
      };

      const filter = {};

      const result = PostMapper.toGetPosts(filter);
      expect(result).toEqual(expected);
    });
  });
});
