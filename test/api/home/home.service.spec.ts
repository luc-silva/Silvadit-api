import { Test, TestingModule } from '@nestjs/testing';
import { createFeedItem } from 'test/mock/data/home';
import { createCompletedUserData } from 'test/mock/data/user';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { HomeService } from '~/api/home/home.service';
import { HomepageMapper } from '~/api/home/utils/home.mapper';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { CreatePostDTO } from '~/api/post/types/post.dto';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';

describe('HomeService', () => {
  let homeService: HomeService;
  let postRepository: MockPostRepository;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    postRepository = new MockPostRepository();
    userRepository = new MockUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: POST_REPOSITORY_TOKEN,
          useValue: {},
        },
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
      ],
    })
      .overrideProvider(POST_REPOSITORY_TOKEN)
      .useValue(postRepository)
      .overrideProvider(USER_REPOSITORY_TOKEN)
      .useValue(userRepository)
      .compile();

    homeService = module.get<HomeService>(HomeService);
  });

  describe('Mapper', () => {
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

  describe('GET', () => {
    describe('getFeed', () => {
      //alow not logged public in the future
      it('Should create exception if user not found', async () => {
        const sessionMock = { id: 'asd' } as ISession;

        userRepository.getUserByIdOrUsername.mockResolvedValue(null);

        expect(homeService.getFeed(sessionMock)).rejects.toThrow(
          'User not found.',
        );
      });

      it('Should return a array of feed items', async () => {
        const sessionMock = { id: 'asd' } as ISession;
        const userMock = createCompletedUserData({userId: "asd"})

        const expected: IFeedOutput[] = [createFeedItem()]

        userRepository.getUserByIdOrUsername.mockResolvedValue(userMock);
        userRepository.getUserFeed.mockResolvedValue([createFeedItem()]);

        const result = await homeService.getFeed(sessionMock)

        expect(result).toBeInstanceOf(Array)
        expect(result).toEqual(expected)
      });
    });
  });
});
