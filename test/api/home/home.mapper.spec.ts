import { createFeedItem, createRawFeedItem } from "test/mock/data/home";
import { createCompletedUserData } from "test/mock/data/user";
import { HomepageMapper } from "~/api/home/utils/home.mapper";
import { CreatePostDTO } from "~/api/post/types/post.dto";

describe('Mapper', () => {
    describe('createPost', () => {
      it('Should map post creation params correctly', () => {
        const expected: ICreatePostParams = {
          content: 'Lorem',
          title: 'Lorem Title',
          forum_id: null,
          is_nsfw: 'N',
          user_id: 'ABC',
        };
        const data: CreatePostDTO = {
          content: 'Lorem',
          title: 'Lorem Title',
          isNsfw: 'false',
          forumId: '',
        };

        const result = HomepageMapper.createPost(
          data,
          createCompletedUserData({ userId: 'ABC' }),
        );

        expect(result).toEqual(expected);
      });
    });

    describe('createPost', () => {
      it('Should map feed correctly', () => {
        const expected: IFeedOutput[] = [createFeedItem()];
        const data: IRawFeed[] = [createRawFeedItem()];

        const result = HomepageMapper.mapRawFeed(data);

        expect(result).toEqual(expected);
      });
    });
  });