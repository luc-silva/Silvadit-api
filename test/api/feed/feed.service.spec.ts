import { Test, TestingModule } from '@nestjs/testing';
import { createSessionMock } from 'test/mock/data/auth';
import { createGetFeedDataDTO } from 'test/mock/data/feed';
import { createCompletedUserData } from 'test/mock/data/user';
import { MockPostRepository } from 'test/mock/repositories/post.repository';
import { MockUserRepository } from 'test/mock/repositories/user.repository';
import { FeedService } from '~/api/feed/feed.service';
import { POST_REPOSITORY_TOKEN } from '~/api/post/repository/post.repository.base';
import { USER_REPOSITORY_TOKEN } from '~/api/user/repository/user.repository.token';

describe('FeedService', () => {
  let feedService: FeedService;
  let postRepository: MockPostRepository;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    postRepository = new MockPostRepository();
    userRepository = new MockUserRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
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

    feedService = module.get<FeedService>(FeedService);
  });

  describe('getFeed', () => {
    it('If authed, should throw exception when user not found', async () => {
      const dto = createGetFeedDataDTO();
      const sessionMock = createSessionMock();

      await expect(feedService.getFeed(dto, sessionMock)).rejects.toThrow(
        'User not found',
      );
    });

    it.skip('Should call getPost from postRepositories if user authed', async () => {
      const dto = createGetFeedDataDTO();
      const sessionMock = createSessionMock();

      const expectedFilter = {};
      const expectedOrder: IOrder = {
        column: 'P.DATE',
        direction: 'ASC',
      };

      userRepository.getUserByIdOrUsername.mockResolvedValue(
        createCompletedUserData(),
      );

      await feedService.getFeed(dto, sessionMock);
      expect(postRepository.getPosts).toHaveBeenCalledWith(expectedFilter, expectedOrder);
    });
  });
});
