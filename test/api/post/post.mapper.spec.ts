import {
  createGetPostDTO,
  createGetPostFilter,
  createGetPostUnmappedFilter,
  createPostOutput,
  createPostRaw,
  createPostUpdateDto,
  createPostUpdateParams,
} from 'test/mock/data/post';
import { createCompletedUserData } from 'test/mock/data/user';
import { GetPostsDTO } from '~/api/post/types/post.dto';
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
  /*
  continuar refactor de post. user_id para pegar posts de amigos. from_user_id para especificar target de post
  */

  describe('getPosts', () => {
    it('Should map correctly', () => {
      const forumIdMock = 'ABC';
      const expected: IGetPostsParams = {
        forum_id: forumIdMock,
        from_user_id: 'ABCEDFGE',
        page: 1,
        items_per_page: 5,
        nsfw: 'N',
      };
      const mockedUser = createCompletedUserData({ userId: 'ABCEDFGE' });

      const filter = createGetPostDTO({
        userId: mockedUser.userId,
        postId: undefined,
        forumId: forumIdMock,
      });

      const result = PostMapper.toGetPosts(filter);

      expect(result).toEqual(expected);
    });

    it('Should map correctly if params not specified', () => {
      const expected: IGetPostsParams = {
        items_per_page: 10,
        page: 1,
        nsfw: 'N',
      };
      const filter: GetPostsDTO = {
        itemsPerPage: '10',
        page: '1',
      };

      const result = PostMapper.toGetPosts(filter);
      expect(result).toEqual(expected);
    });
  });
});
